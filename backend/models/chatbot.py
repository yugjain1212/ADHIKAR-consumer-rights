from pydantic import BaseModel, Field
from typing import List, Literal, Optional
from datetime import datetime
import uuid

class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ChatSession(BaseModel):
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: Optional[str] = None
    messages: List[dict] = []
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    
    def to_dict(self):
        return {
            "session_id": self.session_id,
            "user_id": self.user_id,
            "messages": self.messages,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    
    @classmethod
    def from_dict(cls, data):
        return cls(**data)