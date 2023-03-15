import json

import polars as pl
import pandas as pd

DEFAULT_PATH = "./master_fnn.pkl"


def insert_tweet(db):
    # Init Collection
    if "tweets" in db.list_collection_names():
        db.drop_collection("tweets")
    tweets_col = db["tweets"]
    if "tweet_annotations" in db.list_collection_names():
        db.drop_collection("tweet_annotations")
    annotations_col = db["tweet_annotations"]
    if "tweet_hashtags" in db.list_collection_names():
        db.drop_collection("tweet_hashtags")
    hashtags_col = db["tweet_hashtags"]
    if "tweet_urls" in db.list_collection_names():
        db.drop_collection("tweet_urls")
    urls_col = db["tweet_urls"]
    if "tweet_cashtags" in db.list_collection_names():
        db.drop_collection("tweet_cashtags")
    cashtags_col = db["tweet_cashtags"]
    if "tweet_mentions" in db.list_collection_names():
        db.drop_collection("tweet_mentions")
    mentions_col = db["tweet_mentions"]
    if "tweet_context" in db.list_collection_names():
        db.drop_collection("tweet_context")
    context_col = db["tweet_context"]
    print("Tweet collection complete")

    # Read Data
    tweets = pd.read_pickle(DEFAULT_PATH)
    tweets_pd = tweets[
        [
            "lang",
            "id",
            "entities",
            "public_metrics",
            "context_annotations",
            "possibly_sensitive",
            "created_at",
            "author_id",
            "text",
            "conversation_id",
            "edit_history_tweet_ids",
            "reply_settings",
            "in_reply_to_user_id",
            "referenced_tweets",
            "geo",
            "withheld",
            "label",
        ]
    ]
    tweets_pd["text"] = tweets_pd["text"].astype(str)
    print("Tweet pd complete")
    tweets_pl = pl.from_pandas(tweets_pd, schema_overrides={"text": pl.Utf8})
    tweets_pl.head()
    print("Tweet pl complete")

    print("Load data complete")

    def handle_replied_tweets(x, match_type):
        currentLs = list(
            map(lambda x: x["id"], filter(lambda z: z["type"] == match_type, x))
        )
        return currentLs if len(currentLs) > 0 else None

    tweets_pl_extracted = tweets_pl.select(
        [
            pl.col("id").alias("tweet_id"),
            pl.col("text").alias("content"),
            "created_at",
            "author_id",
            "possibly_sensitive",
            "reply_settings",
            "conversation_id",
            "edit_history_tweet_ids",
            "lang",
            "public_metrics",
            "label",
            pl.col("referenced_tweets")
            .apply(lambda x: handle_replied_tweets(x, "replied_to"))
            .alias("replied_to_ids"),
            pl.col("referenced_tweets")
            .apply(lambda x: handle_replied_tweets(x, "quoted"))
            .alias("quote_ids"),
        ]
    ).unnest("public_metrics")

    tweets_dict = tweets_pl_extracted.to_dicts()
    tweets_col.insert_many(tweets_dict)

    print("Insert tweets complete")

    entities = tweets_pl.select(
        [pl.col("id").alias("tweet_id"), pl.col("entities")]
    ).unnest("entities")

    annotations_pl = entities.select("tweet_id", "annotations").explode("annotations")

    annotations_dict = annotations_pl.to_dicts()
    annotations_col.insert_many(annotations_dict)

    hashtags_pl = entities.select("tweet_id", "hashtags").explode("hashtags")

    hashtags_dict = hashtags_pl.to_dicts()
    hashtags_col.insert_many(hashtags_dict)

    urls_pl = entities.select("tweet_id", "urls").explode("urls")

    urls_dict = urls_pl.to_dicts()
    urls_col.insert_many(urls_dict)

    cashtags_pl = entities.select("tweet_id", "cashtags").explode("cashtags")

    cashtags_dict = cashtags_pl.to_dicts()
    cashtags_col.insert_many(cashtags_dict)

    mentions_pl = entities.select("tweet_id", "mentions").explode("mentions")

    mentions_dict = mentions_pl.to_dicts()
    mentions_col.insert_many(mentions_dict)

    print("Insert tweet annotation complete")

    context_annotations_extracted = (
        tweets_pl.select([pl.col("id").alias("tweet_id"), "context_annotations"])
        .explode("context_annotations")
        .unnest("context_annotations")
        .unnest("domain")
        .select(
            [
                pl.col("tweet_id"),
                pl.col("description").alias("domain_description"),
                pl.col("id").alias("domain_id"),
                pl.col("name").alias("domain_name"),
                pl.col("entity"),
            ]
        )
        .unnest("entity")
        .select(
            [
                pl.col("tweet_id"),
                pl.col("domain_description"),
                pl.col("domain_id").cast(pl.Int64),
                pl.col("domain_name"),
                pl.col("description").alias("entity_description"),
                pl.col("id").alias("entity_id").cast(pl.Int64),
                pl.col("name").alias("entity_name"),
            ]
        )
    )
    context_annotations_dict = context_annotations_extracted.to_dicts()
    context_col.insert_many(context_annotations_dict)

    print("Insert tweet context annotation complete")

    pass
