FROM ubuntu:18.04

# Upgrade installed packages
RUN apt-get update && apt-get upgrade -y && apt-get clean
# Python package management and basic dependencies
RUN apt-get install -y curl python3.8 python3.8-dev python3.8-distutils
# Register the version in alternatives
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.8 1
# Set python 3 as the default python
RUN update-alternatives --set python /usr/bin/python3.8

# Install necessary dependencies for MMS and SageMaker Inference Toolkit
RUN apt-get -y install --no-install-recommends \
  build-essential \
  ca-certificates \
  openjdk-8-jdk-headless \
  curl \
  vim \
  && rm -rf /var/lib/apt/lists/* \
  && python --version \
  && curl -O https://bootstrap.pypa.io/get-pip.py \
  && python get-pip.py

RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1
RUN update-alternatives --install /usr/local/bin/pip pip /usr/local/bin/pip3 1

# Install MXNet, MMS, and SageMaker Inference Toolkit to set up MMS
RUN pip3 --no-cache-dir install mxnet \
  multi-model-server \
  sagemaker-inference \
  retrying

RUN apt install gcc g++

WORKDIR /app

# Dependencies
RUN pip3 install scikit-learn
RUN pip3 install gensim
RUN pip3 install -U pip setuptools wheel
RUN pip3 install -U spacy
RUN pip3 install scikit-learn==1.2.1
RUN pip3 install joblib==1.2.0
RUN pip3 install multi-model-server sagemaker-inference
RUN pip3 install numpy==1.23.5
RUN python -m spacy download en_core_web_sm

# Add into path for project regconition
ENV PYTHONPATH="${PYTHONPATH}:/app"

# Move all of the file from local to docker volume
COPY . .

# Host
ENTRYPOINT ["python", "/app/entrypoint.py"]
