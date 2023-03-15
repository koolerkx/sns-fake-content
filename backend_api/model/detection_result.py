from typing import List
from pydantic import BaseModel

class DetectionResult(BaseModel):
    result: bool # true if successful, false if not
    data: float