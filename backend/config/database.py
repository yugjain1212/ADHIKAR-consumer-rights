import os
import sys
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get MongoDB connection string from environment variables
# Default to a local MongoDB instance if not provided
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'adhikar_db')

# Create MongoDB client with a shorter timeout for faster failure
try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    # Validate connection
    client.admin.command('ping')
    db = client[DB_NAME]
    
    # Collections
    complaints_collection = db.complaints
    chat_history_collection = db.chat_history
    documents_collection = db.documents
    
    # Flag to indicate if MongoDB is available
    mongodb_available = True
    
except ServerSelectionTimeoutError:
    print("Warning: Could not connect to MongoDB. Running in demo mode with limited functionality.")
    mongodb_available = False
    
    # Create dummy collections for demo mode
    class DummyCollection:
        def __init__(self, name):
            self.name = name
            self.data = []
            
        def insert_one(self, document):
            self.data.append(document)
            return type('obj', (object,), {'inserted_id': len(self.data)})
            
        def insert_many(self, documents):
            for doc in documents:
                self.data.append(doc)
            
        def find_one(self, query):
            # Simple implementation for demo purposes
            if not self.data:
                return None
            return self.data[0]
            
        def find(self, query=None):
            return self.data
            
        def create_index(self, keys, **kwargs):
            pass
            
        def count_documents(self, query):
            return len(self.data)
            
        def update_one(self, query, update, **kwargs):
            return type('obj', (object,), {'modified_count': 1})
    
    # Create dummy collections
    complaints_collection = DummyCollection('complaints')
    chat_history_collection = DummyCollection('chat_history')
    documents_collection = DummyCollection('documents')

def init_db():
    """Initialize database with required collections and indexes"""
    if not mongodb_available:
        print("Initializing in-memory database for demo mode...")
        # Load sample documents
        from models.document import sample_documents
        documents_collection.insert_many(sample_documents)
        print("Demo database initialized with sample data")
        return
    
    try:
        # Create indexes for faster queries
        complaints_collection.create_index([("email", 1)])
        complaints_collection.create_index([("complaint_id", 1)], unique=True)
        
        chat_history_collection.create_index([("user_id", 1)])
        
        documents_collection.create_index([("title", 1)])
        documents_collection.create_index([("category", 1)])
        
        # Initialize documents collection with sample documents if empty
        if documents_collection.count_documents({}) == 0:
            from models.document import sample_documents
            documents_collection.insert_many(sample_documents)
            
        print("Database initialized successfully")
    except Exception as e:
        print(f"Error initializing database: {str(e)}")
        sys.exit(1)

# Call this function when the application starts
if __name__ == "__main__":
    init_db()