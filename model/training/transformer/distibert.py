import datasets
import evaluate
import numpy as np
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from transformers import (
    AutoModelForSequenceClassification,
    DistilBertForSequenceClassification,
)

dataset = datasets.load_from_disk("data/data_ds")

from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("distilbert-base-cased")


def tokenize_function(examples):
    return tokenizer(
        examples["text"], padding="max_length", truncation=True, max_length=128
    )


tokenized_datasets = dataset.map(tokenize_function, batched=True)


model = AutoModelForSequenceClassification.from_pretrained(
    "distilbert-base-cased", num_labels=1, problem_type="single_label_classification"
)


metric = evaluate.load("accuracy")


def compute_metrics(pred):
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)
    precision, recall, f1, _ = precision_recall_fscore_support(
        labels, preds, average="binary"
    )
    acc = accuracy_score(labels, preds)
    return {"accuracy": acc, "f1": f1, "precision": precision, "recall": recall}


import os
import time

training_id = time.strftime(f"training-%Y%m%d-%H%M%S$-model-{model.name_or_path}")

from transformers import Trainer, TrainingArguments

# https://zhuanlan.zhihu.com/p/363670628
training_args = TrainingArguments(
    output_dir=f"./model/${training_id}/log/",
    evaluation_strategy="steps",
    prediction_loss_only=False,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    gradient_accumulation_steps=1,
    num_train_epochs=20,
    logging_dir=f"./model/${training_id}/log/",
    load_best_model_at_end=True,
    seed=2023,
)


trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["validation"],
    compute_metrics=compute_metrics,
)

trainer.train()
