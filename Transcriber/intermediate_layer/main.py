from fastapi import FastAPI, Request
import httpx
from httpx import ConnectError

app = FastAPI()

BASE_URL = "http://[2620:cc:8000:e0d:a496:37ac:5f1b:74f5]:8080"

@app.get("/local")
async def local():
    return {"message": "This Intermediate layer is running locally"}

async def fetch_data(url):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status()  # Raise an exception for non-2xx responses
            return response.json()
        except ConnectError as e:
            return {"error": f"Connection error: {e}"}
        except httpx.HTTPError as e:
            return {"error": f"HTTP error: {e}"}
        except Exception as e:
            return {"error": str(e)}

@app.get("/up")
async def up():
    return await fetch_data(f"{BASE_URL}/up")

@app.get("/data/sentiment")
async def sentiment():
    return await fetch_data(f"{BASE_URL}/data/sentiment")

@app.post("/transcribe_file")
async def transcribe_file(request: Request):
    data = await request.json()
    return await fetch_data(f"{BASE_URL}/transcribe_file")

@app.post("/play")
async def play(request: Request):
    data = await request.json()
    return await fetch_data(f"{BASE_URL}/play")

@app.get("/report")
async def report():
    return await fetch_data(f"{BASE_URL}/report")

