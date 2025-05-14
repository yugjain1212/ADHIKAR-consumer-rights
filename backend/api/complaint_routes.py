from flask import Blueprint, request, jsonify
from services.complaint_service import (
    create_complaint, 
    get_complaint, 
    get_complaints_by_email,
    update_complaint_status
)

complaint_bp = Blueprint('complaints', __name__)

@complaint_bp.route('/', methods=['POST'])
def submit_complaint():
    """
    Endpoint to submit a new consumer complaint
    
    Request body: Complaint data as JSON
    
    Returns:
        JSON response with complaint ID
    """
    data = request.json
    
    if not data:
        return jsonify({
            "success": False,
            "error": "Missing complaint data"
        }), 400
    
    # Required fields validation
    required_fields = [
        'full_name', 'email', 'phone', 'product_name', 
        'company_name', 'purchase_date', 'complaint_type',
        'issue_description', 'desired_resolution'
    ]
    
    missing_fields = [field for field in required_fields if field not in data]
    
    if missing_fields:
        return jsonify({
            "success": False,
            "error": f"Missing required fields: {', '.join(missing_fields)}"
        }), 400
    
    # Create complaint using service
    result = create_complaint(data)
    
    if result["success"]:
        return jsonify(result), 201
    else:
        return jsonify(result), 400

@complaint_bp.route('/<complaint_id>', methods=['GET'])
def get_complaint_by_id(complaint_id):
    """
    Endpoint to retrieve a specific complaint by ID
    
    Args:
        complaint_id: The ID of the complaint to retrieve
        
    Returns:
        JSON response with complaint details
    """
    if not complaint_id:
        return jsonify({
            "success": False,
            "error": "Missing complaint ID"
        }), 400
    
    # Get complaint using service
    result = get_complaint(complaint_id)
    
    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 404

@complaint_bp.route('/user/<email>', methods=['GET'])
def get_user_complaints(email):
    """
    Endpoint to retrieve all complaints for a specific email address
    
    Args:
        email: The email address to search for
        
    Returns:
        JSON response with list of complaints
    """
    if not email:
        return jsonify({
            "success": False,
            "error": "Missing email address"
        }), 400
    
    # Get complaints using service
    result = get_complaints_by_email(email)
    
    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 500

@complaint_bp.route('/<complaint_id>/status', methods=['PUT'])
def update_status(complaint_id):
    """
    Endpoint to update the status of a complaint
    
    Args:
        complaint_id: The ID of the complaint to update
        
    Request body:
    {
        "status": "pending|in_progress|resolved|rejected"
    }
    
    Returns:
        JSON response with success message
    """
    if not complaint_id:
        return jsonify({
            "success": False,
            "error": "Missing complaint ID"
        }), 400
    
    data = request.json
    
    if not data or 'status' not in data:
        return jsonify({
            "success": False,
            "error": "Missing required field: status"
        }), 400
    
    status = data.get('status')
    
    # Update complaint status using service
    result = update_complaint_status(complaint_id, status)
    
    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 400