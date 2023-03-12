import json
import os
import time
from datetime import datetime, timedelta

import pandas as pd
import tweepy
from dotenv import load_dotenv
from tqdm import tqdm

load_dotenv()

BEARER_TOKEN = os.getenv("BEARER_TOKEN")

client = tweepy.Client(bearer_token=BEARER_TOKEN)
fetching_options = {
    "expansions": [
        "author_id",
        "in_reply_to_user_id",
        "referenced_tweets.id",
        "geo.place_id",
        "entities.mentions.username",
        "referenced_tweets.id.author_id",
    ],
    "tweet_fields": [
        "id",
        "text",
        "author_id",
        "context_annotations",
        "conversation_id",
        "created_at",
        "entities",
        "in_reply_to_user_id",
        "lang",
        "possibly_sensitive",
        "public_metrics",
        "referenced_tweets",
        "reply_settings",
        "source",
        "withheld",
    ],
    "place_fields": [
        "contained_within",
        "country",
        "country_code",
        "full_name",
        "geo",
        "id",
        "name",
        "place_type",
    ],
    "user_fields": [
        "created_at",
        "description",
        "entities",
        "id",
        "location",
        "name",
        "pinned_tweet_id",
        "profile_image_url",
        "protected",
        "public_metrics",
        "url",
        "username",
        "verified",
        "withheld",
    ],
}
fetching_options = dict(
    (key, ",".join(value)) for key, value in fetching_options.items()
)

dataset_path = "FakeNewsNet"
dataset_file: list[str] = os.listdir(dataset_path)


def fetch_data():
    for file in dataset_file:
        filename = file.replace(".csv", "")
        data_dir = f"{dataset_path}/{filename}"

        if not os.path.exists(f"{data_dir}"):
            print(f"Create directory: {data_dir}")
            os.makedirs(f"{data_dir}")

        if not os.path.exists(f"{data_dir}/tweets"):
            print(f"Create directory: {data_dir}/tweets")
            os.makedirs(f"{data_dir}/tweets")

        if not os.path.exists(f"{data_dir}/users"):
            print(f"Create directory: {data_dir}/users")
            os.makedirs(f"{data_dir}/users")

        # Read tweets id
        dataset_df = pd.read_csv(f"{dataset_path}/{file}")
        dataset_df = dataset_df[dataset_df["tweet_ids"].notna()]

        # https://stackoverflow.com/a/57122617
        dataset_df = (
            dataset_df.assign(tweet_ids=dataset_df["tweet_ids"].str.split("\t"))
            .explode("tweet_ids")
            .reset_index()
        )

        tweets_id = dataset_df.loc[:, "tweet_ids"].tolist()

        # Store tweet ids
        all_tweets_id_file = open(f"{filename}_tweets_all.txt", "w")
        all_tweets_id_file.write("\n".join(tweets_id))
        all_tweets_id_file.close()

        downloaded_id_file = open(f"{filename}_tweets_downloaded.txt", "a")
        error_file = open(f"{filename}_tweets_error.json", "w+")

        # Start fetch loop
        for tweets_id_index in tqdm(range(0, len(tweets_id), 100)):
            complete = False

            while not complete:
                try:
                    ids = tweets_id[tweets_id_index : tweets_id_index + 99]
                    tweets = client.get_tweets(
                        ids=ids,
                        expansions=fetching_options["expansions"],
                        tweet_fields=fetching_options["tweet_fields"],
                        user_fields=fetching_options["user_fields"],
                    )

                    # Error Data
                    error_file_data = error_file.read()
                    error_file_data_json = json.loads(
                        error_file_data if error_file_data != "" else "[]"
                    )
                    error_data = tweets.errors
                    error_file.write(json.dumps([*error_file_data_json, *error_data]))

                    # Tweets Data
                    tweets_data = list(map(lambda x: x.data, tweets.data))
                    for tweet in tweets_data:
                        tweet_file = open(f'{data_dir}/tweets/{tweet["id"]}.json', "w")
                        tweet_file.write(json.dumps(tweet))
                        tweet_file.close()

                    # User Data
                    users_data = list(map(lambda x: x.data, tweets.includes["users"]))
                    for user in users_data:
                        user_file = open(f'{data_dir}/users/{user["id"]}.json', "w")
                        user_file.write(json.dumps(user))
                        user_file.close()

                    downloaded_id_file.write("\n".join(ids) + "\n")

                    complete = True
                except tweepy.TooManyRequests:
                    retry_at = datetime.now() + timedelta(minutes=15)
                    retry_at = retry_at.strftime("%Y-%m-%d, %H:%M:%S")

                    print(
                        f"TooManyRequests, wait 15 mins try again (retry at {retry_at})"
                    )
                    time.sleep(60 * 15)

                except Exception as err:
                    print(err)
                    print(f"tweets_id_index: {tweets_id_index}")
                    break

        downloaded_id_file.close()
        print(f"{file} fetch complete")


if __name__ == "__main__":
    fetch_data()
