import json
import os

import pandas as pd
from tqdm import tqdm

base_path = "FakeNewsNet/"
folders = ["gossipcop_real", "politifact_fake", "politifact_real"]

for folder in folders:
    folder_path = base_path + folder + "/tweets"
    files = os.listdir(folder_path)

    acc_df = pd.DataFrame()

    for file in tqdm(files):
        df = pd.read_json(folder_path + "/" + file, lines=True)
        acc_df = pd.concat([acc_df, df], axis=0)

    acc_df.to_json(folder + ".json", orient="records", indent=2)
