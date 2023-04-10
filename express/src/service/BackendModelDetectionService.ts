import axios from "axios";

enum Model {
  RandomForest = "rf",
  LogisticRegression = "lr",
  SVM = "svm",
  NaiveBayes = "nb",
  DecisionTree = "dt",
  RNN = "RNN",
  XLNet = "XLNet",
  BERT = "BERT",
}

enum Embedding {
  bow = "bow",
  tfidf = "tfidf",
  Word2Vec = "word2vec",
  FastText = "fasttext",
  Transformer = "transformer",
}

type ModelServerResponse = {
  result: boolean;
  data: number;
};

export class BackendModelDetectionService {
  modelServerHost =
    process.env.MODEL_SERVER_ENDPOINT ?? "http://127.0.0.1:8000/v1/detect";

  transformModel = (model: string): Model => {
    switch (model) {
      case "rf":
        return Model.RandomForest;
      case "lr":
        return Model.LogisticRegression;
      case "svm":
        return Model.SVM;
      case "nb":
        return Model.NaiveBayes;
      case "dt":
        return Model.DecisionTree;
      case "rnn":
        return Model.RNN;
      case "xlnet":
        return Model.XLNet;
      case "bert":
        return Model.BERT;
      default:
        throw new Error("invalid model type.");
    }
  };

  transformEmbedding = (model: string): Embedding => {
    switch (model) {
      case "bow":
        return Embedding.bow;
      case "tfidf":
        return Embedding.tfidf;
      case "word2vec":
        return Embedding.Word2Vec;
      case "fasttext":
        return Embedding.FastText;
      case "transformer":
        return Embedding.Transformer;
      default:
        throw new Error("invalid embedding type.");
    }
  };

  makeModelUrl = (model: Model, embedding: Embedding) => {
    return `${this.modelServerHost}/${embedding}/${model}`;
  };

  detect = async (
    type: string,
    text: string
  ): Promise<{
    result: boolean;
    data: number;
  }> => {
    const embedding = this.transformEmbedding(type.split("-")[0]);
    const model = this.transformModel(type.split("-")[1]);

    const url = this.makeModelUrl(model, embedding);

    const res = await axios.get<ModelServerResponse>(url, {
      params: {
        text,
      },
    });

    return {
      result: res.data.result,
      data: res.data.data,
    };
  };
}
