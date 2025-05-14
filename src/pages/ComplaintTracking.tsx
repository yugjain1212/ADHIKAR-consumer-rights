import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

// Temporary mock data - would be replaced with real data from backend
const complaints = [
  {
    id: 1,
    title: "Defective Electronics",
    date: "2025-04-15",
    status: "in-progress",
    description: "Product stopped working within a week of purchase",
    company: "TechCorp Inc.",
    referenceNumber: "COMP-2025-001"
  },
  {
    id: 2,
    title: "Misleading Advertisement",
    date: "2025-04-10",
    status: "resolved",
    description: "Product features did not match the advertisement",
    company: "Marketing Solutions Ltd.",
    referenceNumber: "COMP-2025-002"
  },
  {
    id: 3,
    title: "Billing Dispute",
    date: "2025-04-05",
    status: "pending",
    description: "Charged incorrectly for the service",
    company: "ServiceHub Co.",
    referenceNumber: "COMP-2025-003"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'resolved':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'in-progress':
      return <Clock className="h-4 w-4 text-blue-500" />;
    case 'pending':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case 'rejected':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'resolved':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ComplaintTracking = () => {
  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complaint Tracking</h1>
          <p className="text-muted-foreground">Track and manage your consumer complaints</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Complaints</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {complaints.map((complaint) => (
              <Card key={complaint.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1">{complaint.title}</CardTitle>
                      <CardDescription>
                        Reference: {complaint.referenceNumber}
                      </CardDescription>
                    </div>
                    <Badge 
                      className={`flex items-center gap-1 ${getStatusColor(complaint.status)}`}
                    >
                      {getStatusIcon(complaint.status)}
                      <span className="capitalize">{complaint.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Filed against: {complaint.company}
                      </p>
                      <p className="text-sm">{complaint.description}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        Filed on: {new Date(complaint.date).toLocaleDateString()}
                      </span>
                      <button className="text-primary hover:underline">
                        View Details
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {complaints.filter(c => c.status === 'pending').map((complaint) => (
              <Card key={complaint.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1">{complaint.title}</CardTitle>
                      <CardDescription>
                        Reference: {complaint.referenceNumber}
                      </CardDescription>
                    </div>
                    <Badge 
                      className={`flex items-center gap-1 ${getStatusColor(complaint.status)}`}
                    >
                      {getStatusIcon(complaint.status)}
                      <span className="capitalize">{complaint.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Filed against: {complaint.company}
                      </p>
                      <p className="text-sm">{complaint.description}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        Filed on: {new Date(complaint.date).toLocaleDateString()}
                      </span>
                      <button className="text-primary hover:underline">
                        View Details
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            {complaints.filter(c => c.status === 'in-progress').map((complaint) => (
              <Card key={complaint.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1">{complaint.title}</CardTitle>
                      <CardDescription>
                        Reference: {complaint.referenceNumber}
                      </CardDescription>
                    </div>
                    <Badge 
                      className={`flex items-center gap-1 ${getStatusColor(complaint.status)}`}
                    >
                      {getStatusIcon(complaint.status)}
                      <span className="capitalize">{complaint.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Filed against: {complaint.company}
                      </p>
                      <p className="text-sm">{complaint.description}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        Filed on: {new Date(complaint.date).toLocaleDateString()}
                      </span>
                      <button className="text-primary hover:underline">
                        View Details
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {complaints.filter(c => c.status === 'resolved').map((complaint) => (
              <Card key={complaint.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1">{complaint.title}</CardTitle>
                      <CardDescription>
                        Reference: {complaint.referenceNumber}
                      </CardDescription>
                    </div>
                    <Badge 
                      className={`flex items-center gap-1 ${getStatusColor(complaint.status)}`}
                    >
                      {getStatusIcon(complaint.status)}
                      <span className="capitalize">{complaint.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Filed against: {complaint.company}
                      </p>
                      <p className="text-sm">{complaint.description}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        Filed on: {new Date(complaint.date).toLocaleDateString()}
                      </span>
                      <button className="text-primary hover:underline">
                        View Details
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ComplaintTracking;
