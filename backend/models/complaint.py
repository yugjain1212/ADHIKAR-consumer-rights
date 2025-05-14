from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid

class Complaint(BaseModel):
    complaint_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: str
    phone: str
    product_name: str
    company_name: str
    purchase_date: str
    complaint_type: str
    issue_description: str
    desired_resolution: str
    evidence_description: Optional[str] = None
    status: str = "pending"  # pending, in_progress, resolved, rejected
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    
    def to_dict(self):
        return {
            "complaint_id": self.complaint_id,
            "full_name": self.full_name,
            "email": self.email,
            "phone": self.phone,
            "product_name": self.product_name,
            "company_name": self.company_name,
            "purchase_date": self.purchase_date,
            "complaint_type": self.complaint_type,
            "issue_description": self.issue_description,
            "desired_resolution": self.desired_resolution,
            "evidence_description": self.evidence_description,
            "status": self.status,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    
    @classmethod
    def from_dict(cls, data):
        return cls(**data)