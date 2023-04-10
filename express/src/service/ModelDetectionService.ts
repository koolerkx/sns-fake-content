import endpoints from "../config/endpoint.config.json";
import AWS from "aws-sdk";
import process from "process";

const sageMakerRuntime = new AWS.SageMakerRuntime({
  region: "ap-southeast-2",
  accessKeyId: process.env.AWS_SAGEMAKER_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SAGEMAKER_SECRET_ACCESS_KEY,
});

export class ModelDetectionService {
  detect = async (
    type: string,
    text: string
  ): Promise<{
    result: boolean;
    data: number;
  }> => {
    const index = Object.keys(endpoints).findIndex(
      (e) => e.toLowerCase() === type.toLowerCase()
    );

    if (index === -1) {
      throw new Error("invalid model type.");
    }

    const params = {
      Body: text,
      EndpointName: Object.values(endpoints)[index],
      ContentType: "text/plain",
    };

    const result = (await new Promise((res, rej) =>
      sageMakerRuntime.invokeEndpoint(params, (err, data) => {
        if (err) {
          rej(err);
        } else {
          res(JSON.parse(Buffer.from(data.Body as any).toString()));
        }
      })
    )) as [["true" | "false"], [[number, number]]];

    return {
      result: result[0][0] === "true",
      data: result[1][0][1],
    };
  };
}
