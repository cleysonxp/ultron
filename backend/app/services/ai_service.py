from openai import OpenAI

from app.core.config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)


def ask_ai(message: str) -> str:
    response = client.responses.create(
        model="gpt-4.1-mini",
        input=message,
    )

    return response.output_text
