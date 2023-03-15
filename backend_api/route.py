from fastapi import APIRouter, HTTPException
from model.detection_result import DetectionResult

# define the router
router = APIRouter()

# add controllers by importing them
import controller.detection_controller
