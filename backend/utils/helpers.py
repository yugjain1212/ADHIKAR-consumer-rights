import os
import json
from datetime import datetime
from bson import ObjectId

class JSONEncoder(json.JSONEncoder):
    """
    Custom JSON encoder to handle MongoDB ObjectId and datetime objects
    """
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        if isinstance(obj, datetime):
            return obj.isoformat()
        return json.JSONEncoder.default(self, obj)

def json_response(data):
    """
    Convert data to JSON response with proper encoding
    
    Args:
        data: The data to convert to JSON
        
    Returns:
        JSON-encoded string
    """
    return json.dumps(data, cls=JSONEncoder)

def validate_file_upload(file, allowed_extensions=None, max_size_mb=5):
    """
    Validate a file upload
    
    Args:
        file: The uploaded file object
        allowed_extensions: List of allowed file extensions
        max_size_mb: Maximum file size in MB
        
    Returns:
        Tuple of (is_valid, error_message)
    """
    if not file:
        return False, "No file provided"
    
    # Check file size
    file_size_mb = len(file.read()) / (1024 * 1024)
    file.seek(0)  # Reset file pointer
    
    if file_size_mb > max_size_mb:
        return False, f"File size exceeds maximum allowed size of {max_size_mb}MB"
    
    # Check file extension if provided
    if allowed_extensions:
        filename = file.filename
        file_ext = os.path.splitext(filename)[1].lower()[1:]  # Remove the dot
        
        if file_ext not in allowed_extensions:
            return False, f"File type not allowed. Allowed types: {', '.join(allowed_extensions)}"
    
    return True, None

def generate_reference_number(prefix="COMP"):
    """
    Generate a unique reference number
    
    Args:
        prefix: Prefix for the reference number
        
    Returns:
        String reference number
    """
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    random_suffix = os.urandom(2).hex()
    
    return f"{prefix}-{timestamp}-{random_suffix}"