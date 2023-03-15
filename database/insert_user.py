import json

import polars as pl

DEFAULT_PATH = "./master_users.csv"


def insert_user(db):
    # Init Collection
    if "users" in db.list_collection_names():
        db.drop_collection("users")
    users_col = db["users"]

    if "user_hashtags" in db.list_collection_names():
        db.drop_collection("user_hashtags")
    hashtags_col = db["user_hashtags"]

    if "user_urls" in db.list_collection_names():
        db.drop_collection("user_urls")
    urls_col = db["user_urls"]

    if "user_cashtags" in db.list_collection_names():
        db.drop_collection("user_cashtags")
    cashtags_col = db["user_cashtags"]

    # Read Data
    users = pl.read_csv(DEFAULT_PATH)

    users_column = [
        pl.col("id").alias("user_id"),
        "username",
        "created_at",
        "verified",
        "profile_image_url",
        "name",
        "description",
        pl.col("public_metrics.followers_count").alias("followers_count"),
        pl.col("public_metrics.following_count").alias("following_count"),
        pl.col("public_metrics.tweet_count").alias("tweet_count"),
        pl.col("public_metrics.listed_count").alias("listed_count"),
        "pinned_tweet_id",
        "protected",
        "source",
        "withheld.country_codes",
    ]
    users_col.insert_many(users.select(users_column).to_dicts())

    hashtags = (
        users.filter(pl.col("entities.description.hashtags").is_not_null())
        .select(
            pl.col("id").alias("user_id"),
            pl.col("entities.description.hashtags").alias("hashtag"),
        )
        .to_dicts()
    )
    hashtags_col.insert_many(
        list(
            map(
                lambda x: {
                    **x,
                    "hashtag_raw": json.loads(x["hashtag"].replace("'", '"')),
                    "hashtags": list(
                        map(
                            lambda y: y["tag"],
                            json.loads(x["hashtag"].replace("'", '"')),
                        )
                    ),
                },
                hashtags,
            )
        )
    )

    urls = (
        users.filter(pl.col("entities.description.urls").is_not_null())
        .select(
            pl.col("id").alias("user_id"),
            pl.col("entities.description.urls").alias("urls"),
        )
        .to_dicts()
    )

    def handle_url(x):
        return json.loads(
            x["urls"]
            .replace("'", '"')
            .encode("utf-8")
            .decode("unicode_escape")
            .replace('I"m', "I'm")
            .replace('n"s', "n's")
        )

    urls_col.insert_many(
        list(
            map(
                lambda x: {
                    **x,
                    "raw_urls": x["urls"],
                    "urls": handle_url(x),
                },
                urls,
            )
        )
    )

    cashtags = (
        users.filter(pl.col("entities.description.cashtags").is_not_null())
        .select(
            pl.col("id").alias("user_id"),
            pl.col("entities.description.cashtags").alias("cashtags"),
        )
        .to_dicts()
    )
    cashtags_col.insert_many(
        list(
            map(
                lambda x: {
                    **x,
                    "cashtag_raw": json.loads(x["cashtags"].replace("'", '"')),
                    "cashtags": list(
                        map(
                            lambda y: y["tag"],
                            json.loads(x["cashtags"].replace("'", '"')),
                        )
                    ),
                },
                cashtags,
            )
        )
    )

    print("Insert user complete")

    pass
