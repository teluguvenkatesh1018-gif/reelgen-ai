from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime, timezone
from typing import List
from bson import ObjectId
from app.config.database import get_database
from app.models.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.utils.auth import get_current_user

router = APIRouter(prefix="/api/projects", tags=["Projects"])


def project_to_response(project: dict) -> ProjectResponse:
    return ProjectResponse(
        id=str(project["_id"]),
        user_id=str(project["user_id"]),
        project_name=project["project_name"],
        generation_mode=project["generation_mode"],
        script=project.get("script"),
        image_url=project.get("image_url"),
        audio_url=project.get("audio_url"),
        language=project["language"],
        style=project["style"],
        duration=project["duration"],
        status=project.get("status", "draft"),
        thumbnail_url=project.get("thumbnail_url"),
        video_url=project.get("video_url"),
        created_at=project["created_at"],
        updated_at=project["updated_at"],
    )


@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(project_data: ProjectCreate, current_user=Depends(get_current_user)):
    db = get_database()
    project_doc = {
        "user_id": ObjectId(current_user["id"]),
        "project_name": project_data.project_name,
        "generation_mode": project_data.generation_mode.value,
        "script": project_data.script,
        "image_url": project_data.image_url,
        "audio_url": project_data.audio_url,
        "language": project_data.language.value,
        "style": project_data.style.value,
        "duration": project_data.duration.value,
        "status": "draft",
        "thumbnail_url": None,
        "video_url": None,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    }
    result = await db.projects.insert_one(project_doc)
    project_doc["_id"] = result.inserted_id
    return project_to_response(project_doc)


@router.get("/", response_model=List[ProjectResponse])
async def get_projects(current_user=Depends(get_current_user)):
    db = get_database()
    cursor = db.projects.find({"user_id": ObjectId(current_user["id"])}).sort("created_at", -1)
    projects = await cursor.to_list(length=100)
    return [project_to_response(p) for p in projects]


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: str, current_user=Depends(get_current_user)):
    db = get_database()
    project = await db.projects.find_one({
        "_id": ObjectId(project_id),
        "user_id": ObjectId(current_user["id"]),
    })
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project_to_response(project)


@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: str, project_data: ProjectUpdate, current_user=Depends(get_current_user)
):
    db = get_database()
    update_data = {k: v for k, v in project_data.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No data to update")

    # Convert enums to values
    for key in update_data:
        if hasattr(update_data[key], "value"):
            update_data[key] = update_data[key].value

    update_data["updated_at"] = datetime.now(timezone.utc)

    result = await db.projects.update_one(
        {"_id": ObjectId(project_id), "user_id": ObjectId(current_user["id"])},
        {"$set": update_data},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    project = await db.projects.find_one({"_id": ObjectId(project_id)})
    return project_to_response(project)


@router.delete("/{project_id}")
async def delete_project(project_id: str, current_user=Depends(get_current_user)):
    db = get_database()
    result = await db.projects.delete_one({
        "_id": ObjectId(project_id),
        "user_id": ObjectId(current_user["id"]),
    })
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return {"message": "Project deleted successfully"}
