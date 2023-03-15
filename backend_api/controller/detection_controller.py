from fastapi import APIRouter, HTTPException
from model.detection_result import DetectionResult
from route import router
from random import random
from service.detection_bert_service import DetectionBERTService

from service.detection_tfidf_service import DetectionTFIDFService
from service.detection_word2vec_service import DetectionWord2VecService
from service.detection_xlnet_service import DetectionXLNetService

@router.get("/detect/tfidf/{model_name}", response_model=DetectionResult)
async def detect_image(model_name: str, text: str):
    # calls the detection services to process the image file and return results
    if model_name is None:
        raise HTTPException(status_code=404, detail="Model not found.")

    ret = 0.0

    try:
        ret = DetectionTFIDFService().detect(model_name, text)
    except RuntimeError as e:
        raise HTTPException(status_code=404, detail=str(e))

    return {
        "result": True,
        "data": ret
    }

@router.get("/detect/word2vec/{model_name}", response_model=DetectionResult)
async def detect_image(model_name: str, text: str):
    # calls the detection services to process the image file and return results
    accuracy = random()

    ret = 0.0

    try:
        ret = DetectionWord2VecService().detect(model_name, text)
    except RuntimeError as e:
        raise HTTPException(status_code=404, detail=str(e))

    return {
        "result": True,
        "data": ret
    }

@router.get("/detect/bert", response_model=DetectionResult)
async def detect_image(text: str):
    return {
        "result": True,
        "data": DetectionBERTService().detect(text),
    }

@router.get("/detect/xlnet", response_model=DetectionResult)
async def detect_image(text: str):
    return {
        "result": True,
        "data": DetectionXLNetService().detect(text),
    }
