# api/main.py
from flask import Flask, request, jsonify
import os
import utils


app = Flask(__name__)


# Simple health check
@app.route('/')
def index():
return jsonify({'status': 'ok', 'service': 'blog-assistant-api'})


# Generate content endpoint
@app.route('/generate', methods=['POST'])
def generate():
payload = request.json or {}
topic = payload.get('topic')
style = payload.get('style', 'blog')
length = payload.get('length', 'medium')


if not topic:
return jsonify({'error': 'missing topic'}), 400


prompt = f"Write an SEO-optimized {style} blog post about: {topic}. Length: {length}. Include a short meta description and 5 suggested titles. Return JSON with fields: titles (list), meta (string), content (string)."


# utils.generate_text wraps Vertex AI or other LLM provider calls
response = utils.generate_text(prompt)


# Post-process response if needed, here we assume a plain text answer
return jsonify({'result': response})


# Publish to WordPress (example)
@app.route('/publish/wp', methods=['POST'])
def publish_wp():
payload = request.json or {}
title = payload.get('title')
content = payload.get('content')
token = utils.get_secret('WP_BEARER_TOKEN')
blog_url = os.environ.get('WP_SITE_URL')


if not (title and content and blog_url):
return jsonify({'error': 'missing parameters'}), 400


resp = utils.publish_to_wordpress(blog_url, token, title, content)
return jsonify(resp)


if __name__ == '__main__':
app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
