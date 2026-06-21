import google.generativeai as genai
from app.config.settings import settings


def _get_model():
    genai.configure(api_key=settings.GEMINI_API_KEY)
    return genai.GenerativeModel("gemini-2.0-flash")


async def generate_script(topic: str, language: str, duration: str) -> str:
    model = _get_model()

    prompt = (
        f"You are a professional short-form video scriptwriter. "
        f"Write a social media video script about: {topic}\n\n"
        f"Requirements:\n"
        f"- Language: {language}\n"
        f"- Target duration: {duration} seconds\n"
        f"- Format: Scene-by-scene with visual directions and narration/dialogue\n"
        f"- Style: Engaging, punchy, suitable for Instagram Reels / YouTube Shorts / TikTok\n"
        f"- Include scene numbers, visual descriptions in brackets, and spoken text\n"
        f"- Keep it concise and within the target duration\n\n"
        f"Output only the script, no extra commentary."
    )

    response = await model.generate_content_async(prompt)
    return response.text
