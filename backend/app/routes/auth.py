from fastapi import APIRouter, HTTPException, status
from datetime import datetime, timezone
from bson import ObjectId
from app.config.database import get_database
from app.config.settings import settings
from app.models.user import (
    UserCreate,
    UserLogin,
    GoogleAuthRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    UserResponse,
    TokenResponse,
)
from app.utils.auth import (
    hash_password,
    verify_password,
    create_access_token,
    create_reset_token,
    verify_reset_token,
)
import httpx

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


def user_to_response(user: dict) -> UserResponse:
    return UserResponse(
        id=str(user["_id"]),
        email=user["email"],
        full_name=user["full_name"],
        avatar_url=user.get("avatar_url"),
        auth_provider=user.get("auth_provider", "email"),
        created_at=user["created_at"],
        subscription_plan=user.get("subscription_plan", "free"),
    )


@router.post("/signup", response_model=TokenResponse)
async def signup(user_data: UserCreate):
    db = get_database()
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    user_doc = {
        "email": user_data.email,
        "password": hash_password(user_data.password),
        "full_name": user_data.full_name,
        "auth_provider": "email",
        "avatar_url": None,
        "subscription_plan": "free",
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    }
    result = await db.users.insert_one(user_doc)
    user_doc["_id"] = result.inserted_id

    token = create_access_token({"sub": str(result.inserted_id)})
    return TokenResponse(access_token=token, user=user_to_response(user_doc))


@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin):
    db = get_database()
    user = await db.users.find_one({"email": user_data.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if user.get("auth_provider") == "google" and not user.get("password"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This account uses Google login. Please sign in with Google.",
        )

    if not verify_password(user_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token({"sub": str(user["_id"])})
    return TokenResponse(access_token=token, user=user_to_response(user))


@router.post("/google", response_model=TokenResponse)
async def google_auth(auth_data: GoogleAuthRequest):
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"https://oauth2.googleapis.com/tokeninfo?id_token={auth_data.credential}"
        )

    if resp.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google token",
        )

    google_data = resp.json()
    email = google_data.get("email")
    name = google_data.get("name", email.split("@")[0])
    picture = google_data.get("picture")

    db = get_database()
    user = await db.users.find_one({"email": email})

    if user:
        await db.users.update_one(
            {"_id": user["_id"]},
            {"$set": {"avatar_url": picture, "updated_at": datetime.now(timezone.utc)}},
        )
        user["avatar_url"] = picture
    else:
        user_doc = {
            "email": email,
            "full_name": name,
            "auth_provider": "google",
            "avatar_url": picture,
            "password": None,
            "subscription_plan": "free",
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc),
        }
        result = await db.users.insert_one(user_doc)
        user_doc["_id"] = result.inserted_id
        user = user_doc

    token = create_access_token({"sub": str(user["_id"])})
    return TokenResponse(access_token=token, user=user_to_response(user))


@router.post("/forgot-password")
async def forgot_password(data: ForgotPasswordRequest):
    db = get_database()
    user = await db.users.find_one({"email": data.email})
    # Always return success to prevent email enumeration
    if user:
        reset_token = create_reset_token(data.email)
        # In production, send email with reset link
        # For MVP, return token in response (development only)
        return {
            "message": "If an account exists with this email, a reset link has been sent.",
            "reset_token": reset_token if settings.DEBUG else None,
        }
    return {"message": "If an account exists with this email, a reset link has been sent."}


@router.post("/reset-password")
async def reset_password(data: ResetPasswordRequest):
    email = verify_reset_token(data.token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token",
        )

    db = get_database()
    result = await db.users.update_one(
        {"email": email},
        {
            "$set": {
                "password": hash_password(data.new_password),
                "updated_at": datetime.now(timezone.utc),
            }
        },
    )
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return {"message": "Password reset successfully"}
