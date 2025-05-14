import os
import json
import random
from datetime import datetime
from config.database import chat_history_collection, mongodb_available
from models.chatbot import ChatSession

# Try to import Mistral AI client, but provide fallback if it fails
try:
    from mistralai.client import MistralClient
    from mistralai.models.chat_completion import ChatMessage
    MISTRAL_AVAILABLE = True
except ImportError:
    MISTRAL_AVAILABLE = False

# Initialize Mistral AI client if available
MISTRAL_API_KEY = os.environ.get('MISTRAL_API_KEY', 'VNObujwATQIhTYCwApjEJmqCRn1ZElmo')

if MISTRAL_AVAILABLE:
    try:
        client = MistralClient(api_key=MISTRAL_API_KEY)
        MISTRAL_WORKING = True
    except Exception as e:
        print(f"Error initializing Mistral AI client: {str(e)}")
        MISTRAL_WORKING = False
else:
    MISTRAL_WORKING = False
    print("Mistral AI client not available. Using fallback responses.")

# System prompt to guide the AI assistant
SYSTEM_PROMPT = """
You are Adhikar AI, a consumer rights assistant for Indian consumers. 
Your purpose is to provide accurate information about consumer rights in India, 
help with complaint procedures, and offer guidance on consumer protection laws.

Key information to provide:
1. Consumer Protection Act, 2019 provisions and rights
2. How to file complaints against businesses
3. Refund, replacement, and repair rights
4. E-commerce consumer protection rules
5. Warranty and guarantee information
6. Consumer forum procedures

Always be respectful, clear, and provide actionable advice. 
If you're unsure about specific legal details, acknowledge your limitations and 
suggest consulting with a legal professional.
"""

# Fallback responses for when Mistral AI is not available
FALLBACK_RESPONSES = [
    "Under the Consumer Protection Act, 2019, you have the right to be protected against the marketing of goods and services which are hazardous to life and property.",
    "If you've purchased a defective product, you can file a complaint with the consumer forum. The process involves submitting a written complaint along with relevant evidence.",
    "For e-commerce purchases, you have the right to return products within the time frame specified by the seller. Most platforms offer a 7-30 day return policy.",
    "To file a consumer complaint, you need to gather evidence like receipts, warranty cards, and correspondence with the seller. Then submit a formal complaint to the appropriate consumer forum.",
    "The Consumer Protection Act, 2019 established a three-tier quasi-judicial mechanism: District, State, and National Consumer Disputes Redressal Commissions.",
    "If a service provider fails to deliver the promised service quality, you can seek compensation for deficiency in service under the Consumer Protection Act.",
    "For complaints about essential services like electricity, water, or telecommunications, you can approach the respective regulatory authorities in addition to consumer forums.",
    "Product warranties are legally binding, and sellers must honor them. If they refuse, you can file a complaint with the consumer forum.",
    "The limitation period for filing a consumer complaint is generally 2 years from the date of cause of action.",
    "E-commerce companies must display complete details about the products, including country of origin, specifications, and return/refund policies."
]

# More detailed fallback responses for specific topics
DETAILED_FALLBACKS = {
    "refund": "According to the Consumer Protection Act, 2019, you're entitled to a refund if the product or service doesn't meet the promised standards. For online purchases, e-commerce platforms must process refunds within a reasonable time frame, typically 7-14 days depending on their policy. Keep all receipts and communication as evidence.",
    
    "complaint": "To file a consumer complaint in India, follow these steps:\n1. Gather all evidence (receipts, warranty cards, photos of defective products)\n2. Send a written complaint to the business first\n3. If unresolved, file a complaint with the appropriate consumer forum\n4. For complaints valued up to ₹1 crore, approach the District Forum\n5. For values between ₹1-10 crores, go to the State Commission\n6. For values above ₹10 crores, approach the National Commission",
    
    "warranty": "Warranty claims in India are protected under the Consumer Protection Act. If your product is within the warranty period, the manufacturer must repair or replace it free of cost. If they refuse, you can file a complaint with the consumer forum. Always keep the warranty card and purchase receipt safe.",
    
    "online shopping": "For online shopping in India, the e-Commerce Rules 2020 under the Consumer Protection Act provide specific protections:\n1. Right to accurate information about products\n2. Clear return and refund policies\n3. Prohibition of unfair trade practices\n4. Seller details must be displayed\n5. Cancellation options must be available\n6. Grievance officer contact must be provided",
    
    "defective product": "If you've received a defective product, you have these options:\n1. Request a replacement from the seller\n2. Ask for a repair under warranty\n3. Demand a full refund\n4. If the seller refuses, file a complaint with the consumer forum\nMake sure to document the defect with photos or videos as evidence."
}

def get_chat_response(messages, session_id=None, user_id=None):
    """
    Get a response from the chatbot, with fallback to predefined responses if Mistral AI is unavailable
    
    Args:
        messages: List of message dictionaries with 'role' and 'content'
        session_id: Optional session ID for continuing a conversation
        user_id: Optional user ID for authenticated users
        
    Returns:
        Dictionary with response text and session information
    """
    # Get the last user message for fallback response matching
    last_user_message = ""
    for msg in reversed(messages):
        if msg["role"] == "user":
            last_user_message = msg["content"].lower()
            break
    
    # Function to get a fallback response based on the user's message
    def get_fallback_response():
        # Check if any keywords match our detailed fallbacks
        for keyword, response in DETAILED_FALLBACKS.items():
            if keyword in last_user_message:
                return response
        
        # If no specific match, return a random general response
        return random.choice(FALLBACK_RESPONSES)
    
    # Try to use Mistral AI if available
    if MISTRAL_AVAILABLE and MISTRAL_WORKING:
        try:
            # Format messages for Mistral AI
            formatted_messages = [
                ChatMessage(role="system", content=SYSTEM_PROMPT)
            ]
            
            for msg in messages:
                formatted_messages.append(
                    ChatMessage(role=msg["role"], content=msg["content"])
                )
            
            # Get response from Mistral AI
            response = client.chat(
                model="mistral-small",  # You can change the model as needed
                messages=formatted_messages
            )
            
            # Extract the assistant's response
            assistant_response = response.choices[0].message.content
            
        except Exception as e:
            print(f"Error getting response from Mistral AI: {str(e)}")
            # Fall back to predefined responses
            assistant_response = get_fallback_response()
    else:
        # Use fallback responses if Mistral AI is not available
        assistant_response = get_fallback_response()
    
    try:
        # Create or update chat session in database if MongoDB is available
        if mongodb_available:
            if not session_id:
                # Create new session
                chat_session = ChatSession(
                    user_id=user_id,
                    messages=messages + [{"role": "assistant", "content": assistant_response}]
                )
                session_id = chat_session.session_id
                chat_history_collection.insert_one(chat_session.to_dict())
            else:
                # Update existing session
                chat_history_collection.update_one(
                    {"session_id": session_id},
                    {
                        "$set": {
                            "updated_at": datetime.now()
                        },
                        "$push": {
                            "messages": {"role": "assistant", "content": assistant_response}
                        }
                    }
                )
        else:
            # Generate a session ID if we don't have one and MongoDB is not available
            if not session_id:
                session_id = str(random.randint(10000, 99999))
    except Exception as e:
        print(f"Error saving chat session: {str(e)}")
        # If we can't save to the database, still return a response
        if not session_id:
            session_id = str(random.randint(10000, 99999))
    
    return {
        "success": True,
        "message": assistant_response,
        "session_id": session_id
    }

def get_chat_history(session_id):
    """
    Retrieve chat history for a specific session
    
    Args:
        session_id: The session ID to retrieve
        
    Returns:
        Dictionary with chat history or error
    """
    # If MongoDB is not available, return a default welcome message
    if not mongodb_available:
        return {
            "success": True,
            "session_id": session_id,
            "messages": [
                {
                    "role": "assistant",
                    "content": "Hello! I'm your Consumer Rights Assistant. How can I help you today?"
                }
            ]
        }
    
    try:
        chat_session = chat_history_collection.find_one({"session_id": session_id})
        
        if not chat_session:
            return {
                "success": False,
                "error": "Chat session not found"
            }
            
        return {
            "success": True,
            "session_id": session_id,
            "messages": chat_session["messages"]
        }
        
    except Exception as e:
        print(f"Error retrieving chat history: {str(e)}")
        # Even if there's an error, return a default message so the UI doesn't break
        return {
            "success": True,
            "session_id": session_id,
            "messages": [
                {
                    "role": "assistant",
                    "content": "Hello! I'm your Consumer Rights Assistant. How can I help you today?"
                }
            ]
        }