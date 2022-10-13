
import os
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

from fastapi import FastAPI, File, UploadFile


import whisper 
model = whisper.load_model("base")
options = whisper.DecodingOptions()


class Item(BaseModel):
    filename: str
    #timestamp: datetime

app = FastAPI()

@app.get('/up')
async def up():
    return {"message": "App is running..."}

@app.post('/transcribe_file')
async def transcribe_file(file: bytes = File()):
    f = open("sample.mp4", "wb")
    f.write(file)
    f.close()
    audio = whisper.load_audio("sample.mp4")
    result = model.transcribe(audio)
    os.remove("sample.mp4")
    return {'result': result}

