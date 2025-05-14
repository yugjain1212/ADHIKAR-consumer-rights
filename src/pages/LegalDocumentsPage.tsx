
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, ArrowRight, Info, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { documentsApi } from '@/services/api';

interface Document {
  document_id: string;
  title: string;
  description: string;
  category: string;
  format: string;
}

interface Category {
  id: string;
  name: string;
}

const LegalDocumentsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [documents, setDocuments] = useState<Document[]>([
    {
      document_id: "doc-1",
      title: "Consumer Complaint Template",
      description: "General purpose template for filing consumer complaints to businesses",
      category: "templates",
      format: "DOCX"
    },
    {
      document_id: "doc-2",
      title: "Legal Notice Format",
      description: "Template for sending formal legal notices before pursuing legal action",
      category: "templates",
      format: "PDF"
    },
    {
      document_id: "doc-3",
      title: "Consumer Court Filing Guide",
      description: "Step-by-step guide to filing a case in consumer courts in India",
      category: "guides",
      format: "PDF"
    },
    {
      document_id: "doc-4",
      title: "E-commerce Return Policy Sample",
      description: "Sample return policy compliant with Indian e-commerce regulations",
      category: "samples",
      format: "PDF"
    },
    {
      document_id: "doc-5",
      title: "Product Warranty Claim Form",
      description: "Standard form for claiming warranty service or replacement",
      category: "forms",
      format: "DOCX"
    },
    {
      document_id: "doc-6",
      title: "Service Complaint Letter",
      description: "Template for complaining about poor service quality",
      category: "templates",
      format: "DOCX"
    },
    {
      document_id: "doc-7",
      title: "Refund Request Letter",
      description: "Template for requesting refunds for defective products or services",
      category: "templates",
      format: "DOCX"
    },
    {
      document_id: "doc-8",
      title: "Consumer Protection Act Summary",
      description: "Summary of key provisions in the Consumer Protection Act, 2019",
      category: "guides",
      format: "PDF"
    },
    {
      document_id: "doc-9",
      title: "Consumer Forum Application Form",
      description: "Official application form for district consumer forums",
      category: "forms",
      format: "PDF"
    },
    {
      document_id: "doc-10",
      title: "E-commerce Consumer Rights Guide",
      description: "Comprehensive guide to consumer rights for online shopping in India",
      category: "guides",
      format: "PDF"
    },
    {
      document_id: "doc-11",
      title: "Consumer Rights Handbook",
      description: "Comprehensive handbook on consumer rights and protections in India",
      category: "educational",
      format: "PDF"
    },
    {
      document_id: "doc-12",
      title: "Legal Precedents in Consumer Cases",
      description: "Collection of important legal precedents from consumer court judgments",
      category: "legal",
      format: "PDF"
    },
    {
      document_id: "doc-13",
      title: "Consumer Protection Act 2019 (Full Text)",
      description: "Complete text of the Consumer Protection Act, 2019 with annotations",
      category: "legal",
      format: "PDF"
    },
    {
      document_id: "doc-14",
      title: "Consumer Rights Educational Slides",
      description: "Educational presentation slides explaining consumer rights in simple language",
      category: "educational",
      format: "PDF"
    },
    {
      document_id: "doc-15",
      title: "Product Replacement Request",
      description: "Template letter for requesting replacement of defective products",
      category: "templates",
      format: "DOCX"
    }
  ]);
  
  const [categories, setCategories] = useState<Category[]>([
    { id: 'all', name: 'All Documents' },
    { id: 'templates', name: 'Templates' },
    { id: 'guides', name: 'Guides' },
    { id: 'forms', name: 'Forms' },
    { id: 'samples', name: 'Sample Documents' },
    { id: 'legal', name: 'Legal Resources' },
    { id: 'educational', name: 'Educational Materials' }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize with hardcoded data
  useEffect(() => {
    // Set loading to false since we're using hardcoded data
    setIsLoading(false);
  }, []);

  // No need to handle category change as we're using the filteredDocuments variable
  // which already filters by category

  // No need to handle search as we're using the filteredDocuments variable
  // which already filters by search query

  const handleDownload = (document: Document) => {
    try {
      // In frontend-only mode, we'll just show a toast notification
      // since we can't actually download the file without a backend
      toast({
        title: "Sample Document Download",
        description: `Downloading ${document.title} (${document.format})`
      });
      
      // Generate sample content based on document type and category
      let sampleContent = '';
      
      if (document.category === 'templates') {
        if (document.title.toLowerCase().includes('complaint')) {
          sampleContent = `
[Your Name]
[Your Address]
[City, State ZIP]
[Your Email]
[Your Phone]

[Date]

[Company Name]
[Company Address]
[City, State ZIP]

Subject: Complaint Regarding [Product/Service]

Dear Sir/Madam,

I am writing to express my dissatisfaction with [product/service] that I purchased from your company on [date of purchase]. The [product/service] was purchased from [location/website] with [receipt/order number].

Issue Description:
[Provide detailed description of the issue, including:
- What exactly is wrong with the product/service
- When you first noticed the problem
- Any attempts you've made to resolve the issue
- Reference to any previous communication]

As per the Consumer Protection Act, 2019, I am entitled to [specify the remedy you're seeking: replacement, repair, refund, compensation, etc.]. I have attached copies of [mention any supporting documents: receipts, warranty cards, previous correspondence, etc.] for your reference.

I request you to resolve this matter within [specify reasonable timeframe, e.g., 15 days] from the receipt of this letter. If I do not receive a satisfactory response within this period, I will be compelled to seek redressal through the appropriate consumer forum.

I look forward to your prompt action and a satisfactory resolution.

Sincerely,

[Your Signature]
[Your Name]
[Your Contact Information]
`;
        } else if (document.title.toLowerCase().includes('refund')) {
          sampleContent = `
[Your Name]
[Your Address]
[City, State ZIP]
[Your Email]
[Your Phone]

[Date]

[Company Name]
[Company Address]
[City, State ZIP]

Subject: Refund Request for [Product/Service]

Dear Sir/Madam,

I am writing to request a refund for [product/service] that I purchased from your company on [date of purchase]. The [product/service] was purchased from [location/website] with [receipt/order number].

Reason for Refund:
[Provide detailed explanation for requesting a refund, such as:
- Product defects or issues
- Service not as described
- Delivery issues
- Other valid reasons]

As per your refund policy and the Consumer Protection Act, 2019, I am entitled to a full refund. I have attached copies of [mention any supporting documents: receipts, order confirmation, etc.] for your reference.

Please process the refund to [specify refund method - original payment method, bank account, etc.] within [specify reasonable timeframe, e.g., 7-15 days] from the receipt of this letter.

I look forward to your prompt action on this matter.

Sincerely,

[Your Signature]
[Your Name]
[Your Contact Information]
`;
        } else {
          sampleContent = `
[Your Name]
[Your Address]
[City, State ZIP]
[Your Email]
[Your Phone]

[Date]

[Recipient Name/Organization]
[Recipient Address]
[City, State ZIP]

Subject: [Clear Subject Line Related to Document Purpose]

Dear [Recipient Name/Sir/Madam],

[Introduction paragraph explaining the purpose of the document]

[Main body with detailed information, requests, or statements]

[Closing paragraph with expected action or follow-up]

Sincerely,

[Your Signature]
[Your Name]
[Your Contact Information]
`;
        }
      } else if (document.category === 'guides' || document.category === 'educational') {
        sampleContent = `
# ${document.title}

## Introduction
This guide provides information about consumer rights and protections under the Consumer Protection Act, 2019 in India.

## Key Consumer Rights
1. Right to Safety
2. Right to Information
3. Right to Choose
4. Right to be Heard
5. Right to Seek Redressal
6. Right to Consumer Education

## How to File a Consumer Complaint
1. First approach the business/service provider directly
2. If unresolved, file a written complaint with the appropriate consumer forum
3. Gather all evidence including receipts, warranty cards, and correspondence
4. Submit your complaint with the required fee
5. Attend hearings as scheduled

## Consumer Forums
- District Consumer Disputes Redressal Forum: For claims up to ₹1 crore
- State Consumer Disputes Redressal Commission: For claims between ₹1-10 crores
- National Consumer Disputes Redressal Commission: For claims above ₹10 crores

## Important Timeframes
- Limitation period for filing complaints: 2 years from date of cause of action
- Expected timeframe for resolution: 3-5 months (may vary)

## Contact Information
National Consumer Helpline: 1800-11-4000
Website: www.consumerhelpline.gov.in

## Disclaimer
This document is for informational purposes only and does not constitute legal advice.
`;
      } else if (document.category === 'forms') {
        sampleContent = `
# ${document.title}

## CONSUMER COMPLAINT FORM

1. COMPLAINANT DETAILS:
   Name: _______________________________
   Address: ____________________________
   City: _____________ State: ___________
   PIN: _____________ Phone: ____________
   Email: ______________________________

2. RESPONDENT DETAILS:
   Name of Company/Service Provider: ____________________
   Address: _________________________________________
   City: _____________ State: ___________
   PIN: _____________ Phone: ____________
   Email (if known): _______________________

3. COMPLAINT DETAILS:
   Date of Purchase/Service: ___/___/______
   Amount Paid: ₹______________
   Mode of Payment: □ Cash □ Credit Card □ Debit Card □ UPI □ Other
   Invoice/Receipt Number: _________________
   
4. NATURE OF COMPLAINT:
   □ Defective Product
   □ Poor Service Quality
   □ Unfair Trade Practice
   □ Misleading Advertisement
   □ Overcharging
   □ Other (specify): _______________________

5. COMPLAINT DESCRIPTION:
   _____________________________________________
   _____________________________________________
   _____________________________________________
   _____________________________________________

6. RELIEF SOUGHT:
   □ Replacement of Product
   □ Repair of Product
   □ Refund
   □ Compensation (Amount: ₹_____________)
   □ Other (specify): _______________________

7. DOCUMENTS ATTACHED:
   □ Copy of Invoice/Receipt
   □ Copy of Warranty Card
   □ Photographs of Defective Product
   □ Previous Correspondence with Respondent
   □ Other (specify): _______________________

8. DECLARATION:
   I/We declare that the information provided above is true to the best of my/our knowledge and belief.

   Date: ___/___/______
   Place: ______________
   
   Signature of Complainant: _______________________
`;
      } else if (document.category === 'legal') {
        sampleContent = `
# ${document.title}

## LEGAL NOTICE

WITHOUT PREJUDICE

Date: [Current Date]

To,
[Name of Recipient]
[Address of Recipient]
[City, State, PIN]

Subject: Legal Notice for [Brief Description of Issue]

Dear Sir/Madam,

Under instructions from and on behalf of my client, [Client's Name], residing at [Client's Address], I hereby serve you with the following legal notice:

1. FACTS OF THE CASE:
   [Detailed chronological description of the events leading to the dispute]

2. LEGAL VIOLATIONS:
   Your actions/omissions constitute violations of the following provisions:
   a) Section [Number] of the Consumer Protection Act, 2019
   b) [Any other relevant laws or regulations]
   c) [Terms of contract/warranty/guarantee if applicable]

3. DEMAND:
   In view of the above, my client hereby demands that you:
   a) [Specific demand - e.g., refund, replacement, compensation]
   b) [Any other specific action required]
   c) [Timeline for compliance]

4. CONSEQUENCES OF NON-COMPLIANCE:
   Please note that if you fail to comply with the above demands within [Number] days from the receipt of this notice, my client will be constrained to initiate appropriate legal proceedings against you in the appropriate forum, including but not limited to filing a complaint before the Consumer Disputes Redressal Commission, without any further notice.

   In such an event, you will be liable for all costs, damages, and legal expenses incurred by my client.

5. RESERVATION OF RIGHTS:
   This notice is without prejudice to any other rights or remedies available to my client under the law.

Yours faithfully,

[Lawyer's Name]
Advocate
[Registration Number]
[Contact Information]
`;
      } else {
        sampleContent = `Sample content for ${document.title}\n\nThis is a placeholder for the actual content of the document.`;
      }
      
      // Create a blob with the sample content
      const blob = new Blob([sampleContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `${document.title}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error('Error downloading document:', err);
      toast({
        title: "Download failed",
        description: "There was an error downloading the document. Please try again.",
        variant: "destructive"
      });
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchQuery.trim().length === 0 || 
                         doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <section className="bg-gradient-to-r from-primary/20 to-primary/10 py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Legal Documents & Templates</h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Access free templates, forms, and guides to help you navigate consumer issues
            </p>
            <div className="relative max-w-xl mx-auto">
              <Input
                type="text"
                placeholder="Search for documents..."
                className="pl-10 py-6 bg-background text-foreground w-full rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container-custom">
          <Tabs defaultValue="all" onValueChange={(value) => setActiveCategory(value)}>
            <div className="flex justify-between items-center mb-8">
              <TabsList>
                {categories.map(category => (
                  <TabsTrigger key={category.id} value={category.id}>{category.name}</TabsTrigger>
                ))}
              </TabsList>
            </div>

            {categories.map(category => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isLoading ? (
                    // Loading state
                    Array(6).fill(0).map((_, index) => (
                      <Card key={`skeleton-${index}`} className="card-hover">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="h-8 w-8 bg-primary/20 rounded animate-pulse" />
                            <div className="h-6 w-16 bg-primary/20 rounded animate-pulse" />
                          </div>
                          <div className="h-6 w-3/4 bg-muted animate-pulse rounded mt-2" />
                          <div className="h-4 w-full bg-muted/50 animate-pulse rounded mt-2" />
                        </CardHeader>
                        <CardFooter>
                          <div className="h-9 w-full bg-primary/20 rounded animate-pulse" />
                        </CardFooter>
                      </Card>
                    ))
                  ) : error ? (
                    // Error state
                    <div className="col-span-3 text-center py-16">
                      <Info className="h-12 w-12 text-destructive mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">Error Loading Documents</h3>
                      <p className="text-muted-foreground max-w-md mx-auto mb-4">
                        {error}
                      </p>
                      <Button onClick={() => window.location.reload()}>
                        Try Again
                      </Button>
                    </div>
                  ) : (
                    // Documents list
                    filteredDocuments
                      .filter(doc => category.id === 'all' || doc.category === category.id)
                      .map(document => (
                        <Card key={document.document_id} className="card-hover">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <FileText className="h-8 w-8 text-primary mb-2" />
                              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                                {document.format}
                              </span>
                            </div>
                            <CardTitle className="text-foreground">{document.title}</CardTitle>
                            <CardDescription>{document.description}</CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <Button 
                              onClick={() => handleDownload(document)}
                              className="w-full flex justify-center items-center"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                  )}
                </div>

                {filteredDocuments.filter(doc => 
                  category.id === 'all' || doc.category === category.id
                ).length === 0 && (
                  <div className="text-center py-16">
                    <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No documents found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Try adjusting your search query or check another category
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default LegalDocumentsPage;
