#!/bin/bash

# create virtual environment if not exists
if [ ! -d "./venv" ]; then
  virtualenv ./venv
fi

# for local sourcing
source ./venv/bin/activate

# it would call the virtual env pip
pip3 install -r requirements.txt

# bootstrap the app
make
