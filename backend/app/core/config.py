import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[2]

load_dotenv(BASE_DIR / ".env")

APP_NAME = os.getenv("APP_NAME", "Ultron")
APP_VERSION = os.getenv("APP_VERSION", "0.1.0")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY não foi configurada no arquivo .env")
