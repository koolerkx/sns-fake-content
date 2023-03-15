from fastapi import FastAPI
from route import router
from dotenv import load_dotenv
import os

# load environment variables
load_dotenv()

# bootstrap
app = FastAPI()

# including the routers
app.include_router(router, prefix=os.getenv("API_PREFIX"))
