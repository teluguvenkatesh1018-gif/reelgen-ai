from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import settings

client: AsyncIOMotorClient = None
db = None


async def connect_to_mongo():
    global client, db
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    db = client[settings.MONGODB_DB_NAME]
    # Create indexes
    await db.users.create_index("email", unique=True)
    await db.projects.create_index("user_id")
    print(f"Connected to MongoDB: {settings.MONGODB_DB_NAME}")


async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("Disconnected from MongoDB")


def get_database():
    return db
