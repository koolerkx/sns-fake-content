import polars as pl
import os
import polars as pl
from sklearn.model_selection import train_test_split

DATASET_PATH = os.path.abspath("../dataset/processed_data/datasets")
DATASET_CSV_NAME = "fnn_{}.csv"
DATASET_PARQUET_NAME = "fnn_{}.parquet.gzip"
DATASET_SIZE = ["3xs", "2xs", "xs", "s", "m", "l", "xl"]


def load_csv_data(
    size: str, path: str = DATASET_PATH, file_pattern: str = DATASET_CSV_NAME
) -> pl.DataFrame:
    return pl.read_csv(os.path.join(path, file_pattern.format(size)))


def load_parquet_data(
    size: str, path: str = DATASET_PATH, file_pattern: str = DATASET_PARQUET_NAME
) -> pl.DataFrame:
    return pl.read_parquet(os.path.join(path, file_pattern.format(size)))


def split_data(df: pl.DataFrame):
    X = df.select(pl.col("processed_text").arr.join(" "))["processed_text"].to_numpy()
    y = df.select(pl.col("label"))["label"].to_numpy()

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=2023
    )

    return X_train, X_test, y_train, y_test


def load_liar():
    df = pl.read_parquet("../dataset/processed_data/datasets/liar.parquet.gzip")

    X = df.select(pl.col("processed_text").arr.join(" "))["processed_text"].to_numpy()
    y = df.select(pl.col("label"))["label"].to_numpy()

    return X, y


def get_data(size: str, type: str = "parquet"):

    df = load_parquet_data(size)

    return split_data(df)
