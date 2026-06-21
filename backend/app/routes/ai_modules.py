from fastapi import APIRouter, Depends
from app.utils.auth import get_current_user

router = APIRouter(prefix="/api/ai", tags=["AI Modules (Future)"])

PLACEHOLDER_RESPONSE = {
    "status": "not_implemented",
    "message": "This AI module is planned for a future release.",
}


@router.post("/generate-script")
async def generate_script(current_user=Depends(get_current_user)):
    """Future: Generate video script from topic/prompt using LLM."""
    return {**PLACEHOLDER_RESPONSE, "module": "script_generation"}


@router.post("/plan-scenes")
async def plan_scenes(current_user=Depends(get_current_user)):
    """Future: Break script into scene-by-scene plan with visual descriptions."""
    return {**PLACEHOLDER_RESPONSE, "module": "scene_planning"}


@router.post("/generate-character")
async def generate_character(current_user=Depends(get_current_user)):
    """Future: Generate consistent character across scenes."""
    return {**PLACEHOLDER_RESPONSE, "module": "character_consistency"}


@router.post("/clone-voice")
async def clone_voice(current_user=Depends(get_current_user)):
    """Future: Clone voice from audio sample for narration."""
    return {**PLACEHOLDER_RESPONSE, "module": "voice_cloning"}


@router.post("/generate-video")
async def generate_video(current_user=Depends(get_current_user)):
    """Future: Generate video from scenes, characters, and audio."""
    return {**PLACEHOLDER_RESPONSE, "module": "video_generation"}


@router.post("/generate-captions")
async def generate_captions(current_user=Depends(get_current_user)):
    """Future: Generate captions/subtitles for video."""
    return {**PLACEHOLDER_RESPONSE, "module": "caption_generation"}


@router.post("/generate-hashtags")
async def generate_hashtags(current_user=Depends(get_current_user)):
    """Future: Generate relevant hashtags for social media distribution."""
    return {**PLACEHOLDER_RESPONSE, "module": "hashtag_generation"}


@router.post("/generate-thumbnail")
async def generate_thumbnail(current_user=Depends(get_current_user)):
    """Future: Generate eye-catching thumbnail for video."""
    return {**PLACEHOLDER_RESPONSE, "module": "thumbnail_generation"}
