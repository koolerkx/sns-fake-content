import argparse
import pymongo
import os
from dotenv import load_dotenv


def init_database() -> pymongo.MongoClient:
    host = os.getenv("MONGO_HOST") or "localhost"
    port = os.getenv("MONGO_PORT") or "27017"
    db_name = os.getenv("MONGO_DB_NAME") or "sns-fake-content"

    client = pymongo.MongoClient(f"mongodb://${host}:${port}/")

    if db_name not in client.list_database_names():
        client.drop_database(db_name)

    return client


def insert_tweet(data_path: str, client: pymongo.MongoClient):
    pass


def insert_user(data_path: str, client: pymongo.MongoClient):
    pass


def main(data_path: str, data_type: str):
    client = init_database()

    if data_type == "tweet":
        insert_tweet(data_path, client)
    elif data_type == "user":
        insert_user(data_path, client)
    else:
        raise ValueError("data_type should be tweet or user")

    print("Done")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Insert data into database")
    parser.add_argument("--data_path", type=str, help="path of data")
    parser.add_argument("--data_type", type=str, help="type of data, tweet or user")

    args = parser.parse_args()

    if args.data_path is None or args.data_type is None:
        raise ValueError("--data_path and --data_type is required")

    main(args.data_path, args.data_type)
