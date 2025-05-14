import requests
import json

def test_chatbot_api():
    """Test the chatbot API by sending a message and getting a response"""
    url = "http://localhost:5000/api/chatbot/chat"
    
    # Test message
    payload = {
        "messages": [
            {
                "role": "user",
                "content": "What are my rights if I receive a defective product?"
            }
        ]
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        # Send the request
        response = requests.post(url, json=payload, headers=headers)
        
        # Check if the request was successful
        if response.status_code == 200:
            result = response.json()
            print("API Response:")
            print(json.dumps(result, indent=2))
            
            if result.get("success"):
                print("\nChatbot is working correctly!")
                return True
            else:
                print("\nAPI returned success=False. Error:", result.get("error"))
                return False
        else:
            print(f"API request failed with status code: {response.status_code}")
            print("Response:", response.text)
            return False
            
    except Exception as e:
        print(f"Error testing chatbot API: {str(e)}")
        return False

if __name__ == "__main__":
    print("Testing chatbot API...")
    test_chatbot_api()