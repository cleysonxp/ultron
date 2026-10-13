import json
from urllib.request import Request, urlopen
from urllib.error import URLError


OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "qwen3:4b"


def ask_ai(message: str) -> str:
    payload = {
        "model": MODEL_NAME,        
        "messages": [
            {
                "role": "system",
                "content": (
                    "Você é Ultron, o assistente pessoal de IA deste projeto. "
                    "Responda sempre em português brasileiro, salvo se o usuário "
                    "pedir outro idioma. Seja claro, objetivo e útil. "
                    "Não interprete personagens fictícios nem ameace o usuário. "
                    "Retorne somente a resposta final, sem mostrar seu raciocínio interno."
                ),
            },
            {
                "role": "user",
                "content": message,
            },
        ],
        "stream": False,
        "think": False,
    }

    request = Request(
        OLLAMA_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urlopen(request, timeout=120) as response:
            data = json.loads(response.read().decode("utf-8"))
        
        content = data["message"]["content"]

        if "</think>" in content:
            content = content.rsplit("</think>", 1)[-1]

        return content.strip()

    except (URLError, TimeoutError) as error:
        raise RuntimeError("Não foi possível conectar ao Ollama") from error

