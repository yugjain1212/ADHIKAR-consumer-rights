from flask import Blueprint, request, jsonify, send_file
from services.document_service import (
    get_all_documents,
    get_documents_by_category,
    get_document_by_id,
    search_documents,
    get_document_file_path
)

document_bp = Blueprint('documents', __name__)

@document_bp.route('/', methods=['GET'])
def get_documents():
    """
    Endpoint to retrieve all documents or filter by category
    
    Query parameters:
        category: Optional category to filter by
        query: Optional search query
        
    Returns:
        JSON response with list of documents
    """
    category = request.args.get('category')
    query = request.args.get('query')
    
    if query:
        # Search documents by query
        result = search_documents(query)
    elif category:
        # Filter documents by category
        result = get_documents_by_category(category)
    else:
        # Get all documents
        result = get_all_documents()
    
    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 500

@document_bp.route('/<document_id>', methods=['GET'])
def get_document(document_id):
    """
    Endpoint to retrieve a specific document by ID
    
    Args:
        document_id: The ID of the document to retrieve
        
    Returns:
        JSON response with document details
    """
    if not document_id:
        return jsonify({
            "success": False,
            "error": "Missing document ID"
        }), 400
    
    # Get document using service
    result = get_document_by_id(document_id)
    
    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 404

@document_bp.route('/<document_id>/download', methods=['GET'])
def download_document(document_id):
    """
    Endpoint to download a document file
    
    Args:
        document_id: The ID of the document to download
        
    Returns:
        File download response
    """
    if not document_id:
        return jsonify({
            "success": False,
            "error": "Missing document ID"
        }), 400
    
    # Get document file path using service
    result = get_document_file_path(document_id)
    
    if not result["success"]:
        return jsonify(result), 404
    
    # Return the file for download
    try:
        return send_file(
            result["full_path"],
            as_attachment=True,
            download_name=f"{result['document']['title']}.{result['document']['format'].lower()}"
        )
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Error downloading file: {str(e)}"
        }), 500

@document_bp.route('/categories', methods=['GET'])
def get_categories():
    """
    Endpoint to retrieve all document categories
    
    Returns:
        JSON response with list of categories
    """
    # Define available categories
    categories = [
        {"id": "templates", "name": "Templates"},
        {"id": "guides", "name": "Guides"},
        {"id": "forms", "name": "Forms"},
        {"id": "samples", "name": "Sample Documents"}
    ]
    
    return jsonify({
        "success": True,
        "categories": categories
    }), 200