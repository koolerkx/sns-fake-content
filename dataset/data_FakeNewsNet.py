import os

import pandas as pd
import tweepy
from dotenv import load_dotenv

load_dotenv()

BEARER_TOKEN = os.getenv("BEARER_TOKEN")

client = tweepy.Client(bearer_token=BEARER_TOKEN)
fetching_options = {
    'expansions': ','.join(['author_id', 'in_reply_to_user_id', "referenced_tweets.id", 'geo.place_id', 'entities.mentions.username', 'referenced_tweets.id.author_id']),
    'tweet_fields': ','.join(['id', 'text', 'author_id', 'context_annotations', 'conversation_id', 'created_at', 'entities', 'in_reply_to_user_id', 'lang', 'possibly_sensitive', 'public_metrics', 'referenced_tweets', 'reply_settings', 'source', 'withheld']),
    'user_fields': ','.join(['created_at', 'description', 'entities', 'id', 'location', 'name', 'pinned_tweet_id', 'profile_image_url', 'protected', 'public_metrics', 'url', 'username', 'verified', 'withheld']),
}

dataset_path = 'FakeNewsNet/'
# dataset_file: list[str] = os.listdir(dataset_path)
dataset_file = ['politifact_real.csv']

# Organizer variable for getting latest info of tweets
tweets_master_df = pd.DataFrame()
errors_master_df = pd.DataFrame()

for file in dataset_file:
    path = f'{dataset_path}{file}'
    dataset_df = pd.read_csv(path)

    # remove nan value fo tweet_ids
    dataset_df = dataset_df[dataset_df['tweet_ids'].notna()]

    # https://stackoverflow.com/a/57122617
    dataset_df = dataset_df.assign(tweet_ids=dataset_df['tweet_ids'].str.split(
        '\t')).explode('tweet_ids').reset_index()

    for start in range(0, len(dataset_df), 100):
        tweet_ids = dataset_df.loc[start:start+99, 'tweet_ids'].tolist()
        tweets = client.get_tweets(ids=tweet_ids, expansions=fetching_options['expansions'],
                                   tweet_fields=fetching_options['tweet_fields'], user_fields=fetching_options['user_fields'])

        # user
        user_dict = list(map(lambda x: x.data, tweets.includes['users']))

        users_df = pd.DataFrame(user_dict)
        users_df = users_df.join(users_df['public_metrics'].apply(pd.Series))
        users_df['public_metrics'] = users_df['public_metrics'].astype(str)
        users_df['entities'] = users_df['entities'].astype(str)

        # tweets
        tweets_dict = list(map(lambda x: x.data, tweets.data))

        tweets_df = pd.DataFrame(tweets_dict)
        tweets_df = tweets_df.join(
            tweets_df['public_metrics'].apply(pd.Series))
        tweets_df['public_metrics'] = tweets_df['public_metrics'].astype(str)
        tweets_df['entities'] = tweets_df['entities'].astype(str)
        tweets_df['context_annotations'] = tweets_df['context_annotations'].astype(
            str)

        errors_df = pd.DataFrame(tweets.errors)

        tweets_with_author_df = tweets_df.merge(
            users_df, how='left', left_on='author_id', right_on='id', suffixes=('_tweet', '_author'))
