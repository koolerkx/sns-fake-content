# FastText/ Word2Vev Tensorflow

Must follow this order, ignore the deprecation warnings

```txt
pip install tensorflow==2.12.0
pip install gensim==4.3.1
pip install numpy==1.24

python predict_tensorflow_nn.py
```

In addition, the FastText and the Word2Vec models could not be loaded successfully on the sagemaker inference instance. We MUST convert those models into JSON format or else it will crash the instance.

Furthermore, the tarbell that will be uploaded to s3 should be in the following naming convention:
    - model.h5
    - embedding.json

with the command
```sh
tar -cvzf ./TENSORFLOW_MODEL_NAME.tar.gz ./model.h5 ./embedding.json
```
