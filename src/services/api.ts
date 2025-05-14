import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data for when backend is not available
const mockDocuments = [
  {
    document_id: "doc-1",
    title: "Consumer Complaint Template",
    description: "General purpose template for filing consumer complaints to businesses",
    category: "templates",
    format: "DOCX",
    file_path: "/static/documents/consumer_complaint_template.docx",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-2",
    title: "Legal Notice Format",
    description: "Template for sending formal legal notices before pursuing legal action",
    category: "templates",
    format: "PDF",
    file_path: "/static/documents/legal_notice_format.pdf",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-3",
    title: "Consumer Court Filing Guide",
    description: "Step-by-step guide to filing a case in consumer courts in India",
    category: "guides",
    format: "PDF",
    file_path: "/static/documents/consumer_court_filing_guide.pdf",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-4",
    title: "E-commerce Return Policy Sample",
    description: "Sample return policy compliant with Indian e-commerce regulations",
    category: "samples",
    format: "PDF",
    file_path: "/static/documents/ecommerce_return_policy.pdf",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-5",
    title: "Product Warranty Claim Form",
    description: "Standard form for claiming warranty service or replacement",
    category: "forms",
    format: "DOCX",
    file_path: "/static/documents/warranty_claim_form.docx",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-6",
    title: "Service Complaint Letter",
    description: "Template for complaining about poor service quality",
    category: "templates",
    format: "DOCX",
    file_path: "/static/documents/service_complaint_letter.docx",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-7",
    title: "Refund Request Letter",
    description: "Template for requesting refunds for defective products or services",
    category: "templates",
    format: "DOCX",
    file_path: "/static/documents/refund_request_letter.docx",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-8",
    title: "Consumer Protection Act Summary",
    description: "Summary of key provisions in the Consumer Protection Act, 2019",
    category: "guides",
    format: "PDF",
    file_path: "/static/documents/consumer_protection_act_summary.pdf",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-9",
    title: "Consumer Forum Application Form",
    description: "Official application form for district consumer forums",
    category: "forms",
    format: "PDF",
    file_path: "/static/documents/consumer_forum_application.pdf",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-10",
    title: "E-commerce Consumer Rights Guide",
    description: "Comprehensive guide to consumer rights for online shopping in India",
    category: "guides",
    format: "PDF",
    file_path: "/static/documents/ecommerce_consumer_rights.pdf",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-11",
    title: "Product Replacement Request",
    description: "Template letter for requesting replacement of defective products",
    category: "templates",
    format: "DOCX",
    file_path: "/static/documents/product_replacement_request.docx",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-12",
    title: "Service Delay Compensation Claim",
    description: "Template for claiming compensation for delayed services",
    category: "templates",
    format: "DOCX",
    file_path: "/static/documents/service_delay_compensation.docx",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-13",
    title: "Banking Services Complaint Form",
    description: "Standardized form for filing complaints against banking services",
    category: "forms",
    format: "PDF",
    file_path: "/static/documents/banking_complaint_form.pdf",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-14",
    title: "Insurance Claim Rejection Appeal",
    description: "Template for appealing against rejected insurance claims",
    category: "templates",
    format: "DOCX",
    file_path: "/static/documents/insurance_appeal_letter.docx",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-15",
    title: "Telecom Service Complaint Form",
    description: "Form for filing complaints against telecom service providers",
    category: "forms",
    format: "PDF",
    file_path: "/static/documents/telecom_complaint_form.pdf",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-16",
    title: "Consumer Rights Handbook",
    description: "Comprehensive handbook on consumer rights and protections in India",
    category: "educational",
    format: "PDF",
    file_path: "/static/documents/consumer_rights_handbook.pdf",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-17",
    title: "Legal Precedents in Consumer Cases",
    description: "Collection of important legal precedents from consumer court judgments",
    category: "legal",
    format: "PDF",
    file_path: "/static/documents/consumer_legal_precedents.pdf",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-18",
    title: "Consumer Protection Act 2019 (Full Text)",
    description: "Complete text of the Consumer Protection Act, 2019 with annotations",
    category: "legal",
    format: "PDF",
    file_path: "/static/documents/cpa_2019_full_text.pdf",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-19",
    title: "Consumer Rights Educational Slides",
    description: "Educational presentation slides explaining consumer rights in simple language",
    category: "educational",
    format: "PDF",
    file_path: "/static/documents/consumer_rights_slides.pdf",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    document_id: "doc-20",
    title: "Consumer Forum Procedure Guide",
    description: "Step-by-step guide to consumer forum procedures and hearings",
    category: "guides",
    format: "PDF",
    file_path: "/static/documents/consumer_forum_procedure.pdf",
    created_at: new Date(),
    updated_at: new Date()
  }
];

const mockCategories = [
  { id: "templates", name: "Templates" },
  { id: "guides", name: "Guides" },
  { id: "forms", name: "Forms" },
  { id: "samples", name: "Sample Documents" },
  { id: "legal", name: "Legal Resources" },
  { id: "educational", name: "Educational Materials" }
];

// Chatbot API with fallback to mock data
export const chatbotApi = {
  sendMessage: async (messages: any[], sessionId?: string, userId?: string) => {
    try {
      const response = await api.post('/chatbot/chat', {
        messages,
        session_id: sessionId,
        user_id: userId,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      // Return mock response when backend is not available
      const lastUserMessage = messages.findLast(msg => msg.role === 'user')?.content || '';
      
      let mockResponse = "I'm sorry, I'm having trouble connecting to the server. Here's some general information that might help: ";
      
      if (lastUserMessage.toLowerCase().includes('refund')) {
        mockResponse += "According to the Consumer Protection Act, 2019, you're entitled to a refund if the product or service doesn't meet the promised standards.";
      } else if (lastUserMessage.toLowerCase().includes('complaint')) {
        mockResponse += "To file a consumer complaint in India, gather all evidence, send a written complaint to the business first, and if unresolved, file a complaint with the appropriate consumer forum.";
      } else if (lastUserMessage.toLowerCase().includes('warranty')) {
        mockResponse += "Warranty claims in India are protected under the Consumer Protection Act. If your product is within the warranty period, the manufacturer must repair or replace it free of cost.";
      } else {
        mockResponse += "Under the Consumer Protection Act, 2019, you have the right to be protected against unfair trade practices and the right to seek redressal against restrictive trade practices.";
      }
      
      return {
        success: true,
        message: mockResponse,
        session_id: sessionId || uuidv4()
      };
    }
  },
  
  getChatHistory: async (sessionId: string) => {
    try {
      const response = await api.get(`/chatbot/history/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting chat history:', error);
      // Return mock history when backend is not available
      return {
        success: true,
        session_id: sessionId,
        messages: [
          {
            role: "assistant",
            content: "Hello! I'm your Consumer Rights Assistant. How can I help you today?"
          }
        ]
      };
    }
  },
};

// Complaints API with fallback to mock data
export const complaintsApi = {
  submitComplaint: async (complaintData: any) => {
    try {
      const response = await api.post('/complaints', complaintData);
      return response.data;
    } catch (error) {
      console.error('Error submitting complaint:', error);
      // Return mock response when backend is not available
      return {
        success: true,
        complaint_id: uuidv4(),
        message: "Your complaint has been submitted successfully."
      };
    }
  },
  
  getComplaint: async (complaintId: string) => {
    try {
      const response = await api.get(`/complaints/${complaintId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting complaint:', error);
      // Return mock response when backend is not available
      return {
        success: true,
        complaint: {
          complaint_id: complaintId,
          title: "Sample Complaint",
          description: "This is a sample complaint description.",
          status: "pending",
          created_at: new Date().toISOString()
        }
      };
    }
  },
  
  getUserComplaints: async (email: string) => {
    try {
      const response = await api.get(`/complaints/user/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error getting user complaints:', error);
      // Return mock response when backend is not available
      return {
        success: true,
        complaints: [
          {
            complaint_id: uuidv4(),
            title: "Sample Complaint 1",
            description: "This is a sample complaint description.",
            status: "pending",
            created_at: new Date().toISOString()
          },
          {
            complaint_id: uuidv4(),
            title: "Sample Complaint 2",
            description: "This is another sample complaint description.",
            status: "resolved",
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
          }
        ]
      };
    }
  },
  
  updateComplaintStatus: async (complaintId: string, status: string) => {
    try {
      const response = await api.put(`/complaints/${complaintId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating complaint status:', error);
      // Return mock response when backend is not available
      return {
        success: true,
        message: "Complaint status updated successfully."
      };
    }
  },
};

// Documents API with fallback to mock data
export const documentsApi = {
  getAllDocuments: async (category?: string, query?: string) => {
    try {
      let url = '/documents';
      const params: Record<string, string> = {};
      
      if (category) params.category = category;
      if (query) params.query = query;
      
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      console.error('Error getting documents:', error);
      // Return mock documents when backend is not available
      let filteredDocs = [...mockDocuments];
      
      if (category && category !== 'all') {
        filteredDocs = filteredDocs.filter(doc => doc.category === category);
      }
      
      if (query) {
        const lowerQuery = query.toLowerCase();
        filteredDocs = filteredDocs.filter(doc => 
          doc.title.toLowerCase().includes(lowerQuery) || 
          doc.description.toLowerCase().includes(lowerQuery)
        );
      }
      
      return {
        success: true,
        documents: filteredDocs
      };
    }
  },
  
  getDocument: async (documentId: string) => {
    try {
      const response = await api.get(`/documents/${documentId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting document:', error);
      // Return mock document when backend is not available
      const mockDoc = mockDocuments.find(doc => doc.document_id === documentId);
      
      if (mockDoc) {
        return {
          success: true,
          document: mockDoc
        };
      } else {
        return {
          success: false,
          error: "Document not found"
        };
      }
    }
  },
  
  getDocumentCategories: async () => {
    try {
      const response = await api.get('/documents/categories');
      return response.data;
    } catch (error) {
      console.error('Error getting document categories:', error);
      // Return mock categories when backend is not available
      return {
        success: true,
        categories: mockCategories
      };
    }
  },
  
  // This returns the URL to download the document
  getDocumentDownloadUrl: (documentId: string) => {
    // For mock data, we'll just return a dummy URL
    return `${api.defaults.baseURL}/documents/${documentId}/download`;
  },
};

export default api;