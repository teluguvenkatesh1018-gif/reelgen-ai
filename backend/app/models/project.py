from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum


class GenerationMode(str, Enum):
    TOPIC_TO_VIDEO = "topic_to_video"
    SCRIPT_TO_VIDEO = "script_to_video"
    IMAGE_SCRIPT_TO_VIDEO = "image_script_to_video"
    AUDIO_IMAGE_TO_VIDEO = "audio_image_to_video"


class Language(str, Enum):
    ENGLISH = "english"
    TELUGU = "telugu"
    HINDI = "hindi"
    TAMIL = "tamil"


class Style(str, Enum):
    REALISTIC = "realistic"
    ANIME = "anime"
    CARTOON = "cartoon"
    PIXAR = "pixar"
    CINEMATIC = "cinematic"


class Duration(str, Enum):
    SHORT = "15"
    MEDIUM = "30"
    LONG = "60"


class ProjectStatus(str, Enum):
    DRAFT = "draft"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class ProjectCreate(BaseModel):
    project_name: str
    generation_mode: GenerationMode
    script: Optional[str] = None
    image_url: Optional[str] = None
    audio_url: Optional[str] = None
    language: Language = Language.ENGLISH
    style: Style = Style.REALISTIC
    duration: Duration = Duration.SHORT


class ProjectUpdate(BaseModel):
    project_name: Optional[str] = None
    generation_mode: Optional[GenerationMode] = None
    script: Optional[str] = None
    image_url: Optional[str] = None
    audio_url: Optional[str] = None
    language: Optional[Language] = None
    style: Optional[Style] = None
    duration: Optional[Duration] = None


class ProjectResponse(BaseModel):
    id: str
    user_id: str
    project_name: str
    generation_mode: str
    script: Optional[str] = None
    image_url: Optional[str] = None
    audio_url: Optional[str] = None
    language: str
    style: str
    duration: str
    status: str = "draft"
    thumbnail_url: Optional[str] = None
    video_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime
