from fastapi import APIRouter, HTTPException
from route import router
from service.detection_bert_service import DetectionBERTService
from service.detection_count_service import DetectionCountService
from service.detection_tfidf_service import DetectionTFIDFService
from service.detection_word2vec_service import DetectionWord2VecService
from service.detection_fasttext import DetectionFastTextService
from service.detection_xlnet_service import DetectionXLNetService

from model.detection_result import DetectionResult

from utils.pre_process import text_cleaning

@router.get("/detect/bow/{model_name}", response_model=DetectionResult)
async def detect_count(model_name: str, text: str):
    # calls the detection services to process the image file and return results
    if model_name is None:
        raise HTTPException(status_code=404, detail="Model not found.")

    processed_text = text_cleaning(text)

    ret = 0.0

    try:
        ret = DetectionCountService().detect(model_name, processed_text)
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"result": True, "data": ret}


@router.get("/detect/tfidf/{model_name}", response_model=DetectionResult)
async def detect_tfidf(model_name: str, text: str):
    # calls the detection services to process the image file and return results
    if model_name is None:
        raise HTTPException(status_code=404, detail="Model not found.")

    processed_text = text_cleaning(text)

    ret = 0.0

    try:
        ret = DetectionTFIDFService().detect(model_name, processed_text)
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"result": True, "data": ret}


@router.get("/detect/word2vec/{model_name}", response_model=DetectionResult)
async def detect_word2vec(model_name: str, text: str):
    # calls the detection services to process the image file and return results
    if model_name is None:
        raise HTTPException(status_code=404, detail="Model not found.")

    processed_text = text_cleaning(text)

    ret = 0.0

    try:
        ret = DetectionWord2VecService().detect(model_name, processed_text)
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"result": True, "data": ret}


@router.get("/detect/fasttext/{model_name}", response_model=DetectionResult)
async def detect_fasttext(model_name: str, text: str):
    # calls the detection services to process the image file and return results
    if model_name is None:
        raise HTTPException(status_code=404, detail="Model not found.")
    
    processed_text = text_cleaning(text)

    ret = 0.0

    try:
        ret = DetectionFastTextService().detect(model_name, processed_text)
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"result": True, "data": ret}


@router.get("/detect/transformer/bert", response_model=DetectionResult)
async def detect_bert(text: str):
    return {
        "result": True,
        "data": DetectionBERTService().detect(text),
    }


@router.get("/detect/transformer/xlnet", response_model=DetectionResult)
async def detect_xlnet(text: str):
    return {
        "result": True,
        "data": DetectionXLNetService().detect(text),
    }
