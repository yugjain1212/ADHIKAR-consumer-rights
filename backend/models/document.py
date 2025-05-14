from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class Document(BaseModel):
    document_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    category: str
    format: str
    file_path: str
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    
    def to_dict(self):
        return {
            "document_id": self.document_id,
            "title": self.title,
            "description": self.description,
            "category": self.category,
            "format": self.format,
            "file_path": self.file_path,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    
    @classmethod
    def from_dict(cls, data):
        return cls(**data)

# Sample documents to initialize the database
sample_documents = [
    {
        "document_id": str(uuid.uuid4()),
        "title": "Consumer Complaint Template",
        "description": "General purpose template for filing consumer complaints to businesses",
        "category": "templates",
        "format": "DOCX",
        "file_path": "/static/documents/consumer_complaint_template.docx",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "document_id": str(uuid.uuid4()),
        "title": "Legal Notice Format",
        "description": "Template for sending formal legal notices before pursuing legal action",
        "category": "templates",
        "format": "PDF",
        "file_path": "/static/documents/legal_notice_format.pdf",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "document_id": str(uuid.uuid4()),
        "title": "Consumer Court Filing Guide",
        "description": "Step-by-step guide to filing a case in consumer courts in India",
        "category": "guides",
        "format": "PDF",
        "file_path": "/static/documents/consumer_court_filing_guide.pdf",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "document_id": str(uuid.uuid4()),
        "title": "E-commerce Return Policy Sample",
        "description": "Sample return policy compliant with Indian e-commerce regulations",
        "category": "samples",
        "format": "PDF",
        "file_path": "/static/documents/ecommerce_return_policy.pdf",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "document_id": str(uuid.uuid4()),
        "title": "Product Warranty Claim Form",
        "description": "Standard form for claiming warranty service or replacement",
        "category": "forms",
        "format": "DOCX",
        "file_path": "/static/documents/warranty_claim_form.docx",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "document_id": str(uuid.uuid4()),
        "title": "Service Complaint Letter",
        "description": "Template for complaining about poor service quality",
        "category": "templates",
        "format": "DOCX",
        "file_path": "/static/documents/service_complaint_letter.docx",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "document_id": str(uuid.uuid4()),
        "title": "Consumer Protection Act Summary",
        "description": "Summary of key provisions in the Consumer Protection Act, 2019",
        "category": "guides",
        "format": "PDF",
        "file_path": "/static/documents/consumer_protection_act_summary.pdf",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "document_id": str(uuid.uuid4()),
        "title": "Refund Request Letter",
        "description": "Template for requesting refunds for defective products or services",
        "category": "templates",
        "format": "DOCX",
        "file_path": "/static/documents/refund_request_letter.docx",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "document_id": str(uuid.uuid4()),
        "title": "Consumer Forum Application Form",
        "description": "Official application form for district consumer forums",
        "category": "forms",
        "format": "PDF",
        "file_path": "/static/documents/consumer_forum_application.pdf",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
]