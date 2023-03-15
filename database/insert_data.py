import argparse
import os

import pymongo
from dotenv import load_dotenv

from insert_user import insert_user
from insert_tweet import insert_tweet


def init_database() -> pymongo.database.Database:
    host = os.getenv("MONGO_HOST") or "localhost"
    port = os.getenv("MONGO_PORT") or "27017"
    db_name = os.getenv("MONGO_DB_NAME") or "sns-fake-content"

    client = pymongo.MongoClient(f"mongodb://{host}:{port}/")

    if db_name not in client.list_database_names():
        client.drop_database(db_name)

    return client[db_name]


def main():
    database = init_database()

    insert_tweet(database)
    insert_user(database)

    print("Done")


if __name__ == "__main__":
    # parser = argparse.ArgumentParser(description="Insert data into database")
    # parser.add_argument("--tweet_path", type=str, help="path of data")
    # parser.add_argument("--user_path", type=str, help="path of data")

    # args = parser.parse_args()

    # if args.data_path is None or args.data_type is None:
    #     raise ValueError("--data_path and --data_type is required")

    # main(args.data_path, args.data_type)
    main()
