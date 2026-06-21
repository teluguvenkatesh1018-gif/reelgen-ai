from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.utils.auth import get_current_user
from app.config.settings import settings

router = APIRouter(prefix="/api/script", tags=["Script Generation"])


class ScriptGenerateRequest(BaseModel):
    topic: str
    language: str = "English"
    duration: str = "30"


class ScriptGenerateResponse(BaseModel):
    script: str


@router.post("/generate", response_model=ScriptGenerateResponse)
async def generate_script(
    request: ScriptGenerateRequest,
    current_user=Depends(get_current_user),
):
    if not settings.GEMINI_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI script generation is not configured. Please set GEMINI_API_KEY.",
        )

    try:
        from app.services.ai_modules.script_generator import generate_script as gen

        script = await gen(
            topic=request.topic,
            language=request.language,
            duration=request.duration,
        )
        return ScriptGenerateResponse(script=script)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Script generation failed: {str(e)}",
        )
