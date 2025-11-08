from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# 🧠 In-memory user database
users = {}

# ✅ Sign-Up Route
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if username in users:
        return jsonify({"status": "fail", "message": "Username already exists"}), 409

    users[username] = {
        "email": email,
        "password": generate_password_hash(password),
        "balance": 1.0,
        "history": [
            {"type": "deposit", "amount": 1.0, "note": "Initial funding"}
        ]
    }

    return jsonify({"status": "success", "message": "Account created"}), 201

# 🔐 Login Route
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = users.get(username)
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"status": "fail", "message": "Invalid credentials"}), 401

    return jsonify({
        "status": "success",
        "username": username,
        "balance": user["balance"],
        "history": user["history"]
    })

# 📊 Get User Data
@app.route("/user/<username>", methods=["GET"])
def get_user_data(username):
    user = users.get(username)
    if not user:
        return jsonify({"status": "fail", "message": "User not found"}), 404

    return jsonify({
        "status": "success",
        "username": username,
        "balance": user["balance"],
        "history": user["history"]
    })

# 🚀 Run the server
if __name__ == "__main__":
    app.run(debug=True)