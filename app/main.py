import json
import random
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates

BASE_DIR = Path(__file__).parent.parent

app = FastAPI(title="Quote Generator")

app.mount("/static", StaticFiles(directory=str(BASE_DIR / "app" / "static")), name="static")
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))

QUOTES_FILE = Path(__file__).parent / "quotes.json"


def load_quotes():
    with open(QUOTES_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/api/quote")
async def get_random_quote():
    quotes = load_quotes()
    quote = random.choice(quotes)
    return quote

