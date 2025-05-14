
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

const FeaturedResources = () => {
  return (
    <div className="bg-card p-8 rounded-lg shadow-md mb-12">
      <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>
      
      <div className="space-y-6">
        <div className="flex items-start p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors">
          <FileText className="h-8 w-8 text-primary mr-4 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">Sample Complaint Letter - Defective Product</h3>
            <p className="text-muted-foreground text-sm mb-3">
              A customizable template for filing a complaint about a defective product with a seller or manufacturer.
            </p>
            <Button variant="outline" size="sm" className="flex items-center border-border text-foreground hover:bg-secondary">
              <Download className="h-4 w-4 mr-2" />
              Download DOCX
            </Button>
          </div>
        </div>
        
        <div className="flex items-start p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors">
          <FileText className="h-8 w-8 text-primary mr-4 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">E-commerce Return Rights Checklist</h3>
            <p className="text-muted-foreground text-sm mb-3">
              A comprehensive checklist of your rights when returning products purchased online in India.
            </p>
            <Button variant="outline" size="sm" className="flex items-center border-border text-foreground hover:bg-secondary">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
        
        <div className="flex items-start p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors">
          <FileText className="h-8 w-8 text-primary mr-4 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">Guide to Filing a Consumer Court Case</h3>
            <p className="text-muted-foreground text-sm mb-3">
              Step-by-step instructions for filing a case with your local consumer forum, including required documents.
            </p>
            <Button variant="outline" size="sm" className="flex items-center border-border text-foreground hover:bg-secondary">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedResources;
