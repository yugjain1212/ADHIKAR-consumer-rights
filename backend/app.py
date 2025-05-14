from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Import routes
from api.chatbot_routes import chatbot_bp
from api.complaint_routes import complaint_bp
from api.document_routes import document_bp

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__, static_folder='static')
    
    # Configure CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Register blueprints
    app.register_blueprint(chatbot_bp, url_prefix='/api/chatbot')
    app.register_blueprint(complaint_bp, url_prefix='/api/complaints')
    app.register_blueprint(document_bp, url_prefix='/api/documents')
    
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "healthy", "message": "Adhikar API is running"}), 200
    
    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)