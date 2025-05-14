import os
from config.database import documents_collection
from models.document import Document
from flask import current_app

def get_all_documents():
    """
    Retrieve all available documents
    
    Returns:
        Dictionary with list of documents or error
    """
    try:
        documents_cursor = documents_collection.find({})
        documents = []
        
        for doc in documents_cursor:
            # Convert MongoDB _id to string for JSON serialization
            doc["_id"] = str(doc["_id"])
            documents.append(doc)
            
        return {
            "success": True,
            "documents": documents
        }
        
    except Exception as e:
        print(f"Error retrieving documents: {str(e)}")
        return {
            "success": False,
            "error": f"Error retrieving documents: {str(e)}"
        }

def get_documents_by_category(category):
    """
    Retrieve documents filtered by category
    
    Args:
        category: The category to filter by
        
    Returns:
        Dictionary with filtered documents or error
    """
    try:
        documents_cursor = documents_collection.find({"category": category})
        documents = []
        
        for doc in documents_cursor:
            # Convert MongoDB _id to string for JSON serialization
            doc["_id"] = str(doc["_id"])
            documents.append(doc)
            
        return {
            "success": True,
            "category": category,
            "documents": documents
        }
        
    except Exception as e:
        print(f"Error retrieving documents by category: {str(e)}")
        return {
            "success": False,
            "error": f"Error retrieving documents: {str(e)}"
        }

def get_document_by_id(document_id):
    """
    Retrieve a specific document by ID
    
    Args:
        document_id: The ID of the document to retrieve
        
    Returns:
        Dictionary with document details or error
    """
    try:
        document = documents_collection.find_one({"document_id": document_id})
        
        if not document:
            return {
                "success": False,
                "error": "Document not found"
            }
            
        # Convert MongoDB _id to string for JSON serialization
        document["_id"] = str(document["_id"])
        
        return {
            "success": True,
            "document": document
        }
        
    except Exception as e:
        print(f"Error retrieving document: {str(e)}")
        return {
            "success": False,
            "error": f"Error retrieving document: {str(e)}"
        }

def search_documents(query):
    """
    Search for documents by title or description
    
    Args:
        query: The search query string
        
    Returns:
        Dictionary with search results or error
    """
    try:
        # Create a text search query
        documents_cursor = documents_collection.find({
            "$or": [
                {"title": {"$regex": query, "$options": "i"}},
                {"description": {"$regex": query, "$options": "i"}}
            ]
        })
        
        documents = []
        
        for doc in documents_cursor:
            # Convert MongoDB _id to string for JSON serialization
            doc["_id"] = str(doc["_id"])
            documents.append(doc)
            
        return {
            "success": True,
            "query": query,
            "documents": documents
        }
        
    except Exception as e:
        print(f"Error searching documents: {str(e)}")
        return {
            "success": False,
            "error": f"Error searching documents: {str(e)}"
        }

def get_document_file_path(document_id):
    """
    Get the file path for a document
    
    Args:
        document_id: The ID of the document
        
    Returns:
        Dictionary with file path or error
    """
    try:
        document = documents_collection.find_one({"document_id": document_id})
        
        if not document:
            return {
                "success": False,
                "error": "Document not found"
            }
            
        # Get the file path from the document
        file_path = document["file_path"]
        
        # Check if the file exists
        full_path = os.path.join(current_app.root_path, file_path.lstrip('/'))
        
        if not os.path.exists(full_path):
            return {
                "success": False,
                "error": "Document file not found on server"
            }
            
        return {
            "success": True,
            "file_path": file_path,
            "full_path": full_path,
            "document": {
                "title": document["title"],
                "format": document["format"]
            }
        }
        
    except Exception as e:
        print(f"Error retrieving document file path: {str(e)}")
        return {
            "success": False,
            "error": f"Error retrieving document: {str(e)}"
        }