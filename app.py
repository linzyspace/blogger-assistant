from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Predefined responses
responses = {
    "hi": "Hello! How can I help you today?",
    "hello": "Hi there! How’s it going?",
    "how are you": "I'm a bot, so I don't have feelings, but I'm ready to chat!",
    "bye": "Goodbye! Have a great day!"
}

@app.route("/")
def home():
    return "Blogger Assistant is running!"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "").strip().lower()  # lowercase for matching

    if not message:
        return jsonify({"reply": "I didn't get that!"})

    # Check if we have a predefined response
    reply = responses.get(message, "I'm not sure how to respond to that.")

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
