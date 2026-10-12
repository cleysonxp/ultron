
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.ai_service import ask_ai

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/api/chat")
def chat(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(
            status_code=400,
            detail="A mensagem não pode estar vazia.",
        )

    try:
        answer = ask_ai(request.message)
        return {"response": answer}
    except RuntimeError as error:
        raise HTTPException(
            status_code=502,
            detail="Não foi possível obter uma resposta do Ultron.",
        ) from error
