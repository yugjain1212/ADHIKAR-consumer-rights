from flask import Blueprint, request, jsonify
from services.chatbot_service import get_chat_response, get_chat_history

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route('/chat', methods=['POST'])
def chat():
    """
    Endpoint to get a response from the chatbot
    
    Request body:
    {
        "messages": [{"role": "user", "content": "message text"}],
        "session_id": "optional-session-id",
        "user_id": "optional-user-id"
    }
    
    Returns:
        JSON response with chatbot reply
    """
    data = request.json
    
    if not data or 'messages' not in data:
        return jsonify({
            "success": False,
            "error": "Missing required field: messages"
        }), 400
    
    messages = data.get('messages', [])
    session_id = data.get('session_id')
    user_id = data.get('user_id')
    
    # Validate messages format
    if not isinstance(messages, list) or not all(
        isinstance(m, dict) and 'role' in m and 'content' in m 
        for m in messages
    ):
        return jsonify({
            "success": False,
            "error": "Invalid message format. Each message must have 'role' and 'content' fields."
        }), 400
    
    # Get response from chatbot service
    response = get_chat_response(messages, session_id, user_id)
    
    if response["success"]:
        return jsonify(response), 200
    else:
        return jsonify(response), 500

@chatbot_bp.route('/history/<session_id>', methods=['GET'])
def history(session_id):
    """
    Endpoint to retrieve chat history for a session
    
    Args:
        session_id: The session ID to retrieve
        
    Returns:
        JSON response with chat history
    """
    if not session_id:
        return jsonify({
            "success": False,
            "error": "Missing session ID"
        }), 400
    
    # Get chat history from service
    response = get_chat_history(session_id)
    
    if response["success"]:
        return jsonify(response), 200
    else:
        return jsonify(response), 404