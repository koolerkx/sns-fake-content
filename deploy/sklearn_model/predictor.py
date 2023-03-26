import json

# from boto3.s3.connection import S3Connection
# from botocore.exceptions import ClientError
import logging
import os
import time

import flask
import joblib

# Define the path
prefix = "/opt/ml/"
# model_path = os.path.join(prefix, "model")
model_path = os.path.join(prefix)
logging.info("Model Path" + str(model_path))

# Load the model components
classifier = joblib.load(os.path.join(model_path, "count_rf_pipeline.joblib"))
logging.info("Classifier" + str(classifier))

app = flask.Flask(__name__)


@app.route("/ping", methods=["GET"])
def ping():
    try:
        status = 200
        logging.info("Status : 200")
    except:
        status = 400
    return flask.Response(
        response=json.dumps(" "), status=status, mimetype="application/json"
    )


@app.route("/invocations", methods=["POST"])
def transformation():
    input_json = flask.request.get_json()
    input = input_json["input"]["text"]
    predictions = float(classifier.predict([input]))

    result = {"output": predictions}

    resultjson = json.dumps(result)
    return flask.Response(response=resultjson, status=200, mimetype="application/json")
