import polars as pl
import os
import polars as pl

DATASET_PATH = os.path.abspath("../dataset/processed_data/datasets")
DATASET_CSV_NAME = "fnn_{}.csv"
DATASET_PARQUET_NAME = "fnn_{}.parquet.gzip"
DATASET_SIZE = ["3xs", "2xs", "xs", "s", "m", "l", "xl"]


def load_data(
    size: str, path: str = DATASET_PATH, file_pattern: str = DATASET_CSV_NAME
) -> pl.DataFrame:
    if size not in DATASET_SIZE:
        raise ValueError(f"Size must be one of {DATASET_SIZE}")

    return pl.read_csv(os.path.join(path, file_pattern.format(size)))


def load_parquet_data(
    size: str, path: str = DATASET_PATH, file_pattern: str = DATASET_PARQUET_NAME
) -> pl.DataFrame:
    if size not in DATASET_SIZE:
        raise ValueError(f"Size must be one of {DATASET_SIZE}")

    return pl.read_parquet(os.path.join(path, file_pattern.format(size)))
