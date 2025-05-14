from datetime import datetime
from config.database import complaints_collection
from models.complaint import Complaint

def create_complaint(complaint_data):
    """
    Create a new consumer complaint
    
    Args:
        complaint_data: Dictionary containing complaint information
        
    Returns:
        Dictionary with complaint ID or error
    """
    try:
        # Create a new complaint object
        complaint = Complaint(**complaint_data)
        
        # Insert into database
        result = complaints_collection.insert_one(complaint.to_dict())
        
        if result.inserted_id:
            return {
                "success": True,
                "complaint_id": complaint.complaint_id,
                "message": "Complaint submitted successfully"
            }
        else:
            return {
                "success": False,
                "error": "Failed to submit complaint"
            }
            
    except Exception as e:
        print(f"Error creating complaint: {str(e)}")
        return {
            "success": False,
            "error": f"Error submitting complaint: {str(e)}"
        }

def get_complaint(complaint_id):
    """
    Retrieve a specific complaint by ID
    
    Args:
        complaint_id: The ID of the complaint to retrieve
        
    Returns:
        Dictionary with complaint details or error
    """
    try:
        complaint_data = complaints_collection.find_one({"complaint_id": complaint_id})
        
        if not complaint_data:
            return {
                "success": False,
                "error": "Complaint not found"
            }
            
        # Convert MongoDB _id to string for JSON serialization
        complaint_data["_id"] = str(complaint_data["_id"])
        
        return {
            "success": True,
            "complaint": complaint_data
        }
        
    except Exception as e:
        print(f"Error retrieving complaint: {str(e)}")
        return {
            "success": False,
            "error": f"Error retrieving complaint: {str(e)}"
        }

def get_complaints_by_email(email):
    """
    Retrieve all complaints for a specific email address
    
    Args:
        email: The email address to search for
        
    Returns:
        Dictionary with list of complaints or error
    """
    try:
        complaints_cursor = complaints_collection.find({"email": email})
        complaints = []
        
        for complaint in complaints_cursor:
            # Convert MongoDB _id to string for JSON serialization
            complaint["_id"] = str(complaint["_id"])
            complaints.append(complaint)
            
        return {
            "success": True,
            "complaints": complaints
        }
        
    except Exception as e:
        print(f"Error retrieving complaints by email: {str(e)}")
        return {
            "success": False,
            "error": f"Error retrieving complaints: {str(e)}"
        }

def update_complaint_status(complaint_id, status):
    """
    Update the status of a complaint
    
    Args:
        complaint_id: The ID of the complaint to update
        status: The new status (pending, in_progress, resolved, rejected)
        
    Returns:
        Dictionary with success message or error
    """
    try:
        valid_statuses = ["pending", "in_progress", "resolved", "rejected"]
        
        if status not in valid_statuses:
            return {
                "success": False,
                "error": f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
            }
            
        result = complaints_collection.update_one(
            {"complaint_id": complaint_id},
            {
                "$set": {
                    "status": status,
                    "updated_at": datetime.now()
                }
            }
        )
        
        if result.modified_count == 0:
            return {
                "success": False,
                "error": "Complaint not found or status not changed"
            }
            
        return {
            "success": True,
            "message": f"Complaint status updated to {status}"
        }
        
    except Exception as e:
        print(f"Error updating complaint status: {str(e)}")
        return {
            "success": False,
            "error": f"Error updating complaint status: {str(e)}"
        }