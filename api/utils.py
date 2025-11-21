# api/utils.py
import os
import json
import requests


# NOTE: This file includes a simple Vertex AI usage example.
# In production, prefer the official google-cloud-aiplatform SDK and service account credentials.


def get_secret(name):
"""Helper: return env var or placeholder for secret manager."""
return os.environ.get(name)


def generate_text(prompt: str) -> str:
"""
Placeholder wrapper for a text-generation call.


Replace this with Vertex AI Python SDK (google-cloud-aiplatform) or other provider calls.
Example using the SDK should authenticate via service account.
"""
# For quick local testing we return the prompt back.
return f"[SIMULATED GENERATION]\nPrompt:\n{prompt}\n\n(Replace utils.generate_text with a real LLM call)"




def publish_to_wordpress(site_url: str, bearer_token: str, title: str, content: str):
url = f"{site_url.rstrip('/')}/wp-json/wp/v2/posts"
headers = {
'Authorization': f'Bearer {bearer_token}',
'Content-Type': 'application/json'
}
payload = {
'title': title,
'content': content,
'status': 'draft'
}
r = requests.post(url, headers=headers, json=payload)
try:
return r.json()
except Exception:
return {'status_code': r.status_code, 'text': r.text}
