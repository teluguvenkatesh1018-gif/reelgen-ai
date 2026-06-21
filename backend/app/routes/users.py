from fastapi import APIRouter, Depends
from datetime import datetime, timezone
from app.config.database import get_database
from app.models.user import UserResponse, UserUpdate
from app.utils.auth import get_current_user
from bson import ObjectId

router = APIRouter(prefix="/api/users", tags=["Users"])


@router.get("/me", response_model=UserResponse)
async def get_me(current_user=Depends(get_current_user)):
    return UserResponse(
        id=current_user["id"],
        email=current_user["email"],
        full_name=current_user["full_name"],
        avatar_url=current_user.get("avatar_url"),
        auth_provider=current_user.get("auth_provider", "email"),
        created_at=current_user["created_at"],
        subscription_plan=current_user.get("subscription_plan", "free"),
    )


@router.put("/me", response_model=UserResponse)
async def update_me(update_data: UserUpdate, current_user=Depends(get_current_user)):
    db = get_database()
    data = {k: v for k, v in update_data.model_dump().items() if v is not None}
    data["updated_at"] = datetime.now(timezone.utc)

    await db.users.update_one({"_id": ObjectId(current_user["id"])}, {"$set": data})
    user = await db.users.find_one({"_id": ObjectId(current_user["id"])})
    return UserResponse(
        id=str(user["_id"]),
        email=user["email"],
        full_name=user["full_name"],
        avatar_url=user.get("avatar_url"),
        auth_provider=user.get("auth_provider", "email"),
        created_at=user["created_at"],
        subscription_plan=user.get("subscription_plan", "free"),
    )
