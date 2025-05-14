
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';
import { toast } from "sonner";

const documents = [
  {
    title: "Sample Complaint Letter Template",
    description: "Template for filing complaints against defective products or services",
    fileName: "complaint-letter-template.docx"
  },
  {
    title: "Consumer Court Filing Guide",
    description: "Step-by-step guide for filing cases in consumer courts",
    fileName: "consumer-court-guide.pdf"
  },
  {
    title: "Legal Notice Format",
    description: "Standard format for sending legal notices to businesses",
    fileName: "legal-notice-format.docx"
  }
];

const LegalDocuments = () => {
  const handleDownload = (fileName: string) => {
    // In a real application, this would initiate a download
    // For now, we'll show a toast notification
    toast.success(`Download started for ${fileName}`, {
      description: "This is a demo. In a real app, the file would download.",
      duration: 3000,
    });
  };

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc, index) => (
          <Card key={index} className="bg-card hover:bg-card/90 transition-colors">
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-card-foreground">{doc.title}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {doc.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleDownload(doc.fileName)}
              >
                <Download className="mr-2 h-4 w-4" />
                Download {doc.fileName.split('.').pop()?.toUpperCase()}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LegalDocuments;
