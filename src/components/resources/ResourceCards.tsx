
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, BookOpen, Scale } from 'lucide-react';

const ResourceCards = () => {
  // Using Link components directly for navigation

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <Card className="card-hover bg-card">
        <CardHeader>
          <FileText className="h-8 w-8 text-primary mb-4" />
          <CardTitle>Legal Documents</CardTitle>
          <CardDescription>
            Sample complaint letters, legal templates, and official forms for consumer disputes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            className="w-full"
            asChild
          >
            <Link to="/documents">View Documents</Link>
          </Button>
        </CardContent>
      </Card>
      
      <Card className="card-hover bg-card">
        <CardHeader>
          <BookOpen className="h-8 w-8 text-accent mb-4" />
          <CardTitle>Educational Guides</CardTitle>
          <CardDescription>
            In-depth guides on consumer laws, rights, and procedures for seeking redressal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            className="w-full"
            asChild
          >
            <Link to="/rights">Browse Guides</Link>
          </Button>
        </CardContent>
      </Card>
      
      <Card className="card-hover bg-card">
        <CardHeader>
          <Scale className="h-8 w-8 text-amber-500 mb-4" />
          <CardTitle>Legal Aid Resources</CardTitle>
          <CardDescription>
            Information about consumer forums, legal aid services, and pro bono assistance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            className="w-full"
            asChild
          >
            <Link to="/chatbot">Find Help</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceCards;
