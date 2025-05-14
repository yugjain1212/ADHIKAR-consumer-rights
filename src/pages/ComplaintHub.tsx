import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, PlusCircle, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageProvider';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for demonstration
const mockComplaints = [
  {
    id: '1',
    title: 'Product Quality Issue',
    status: 'In Progress',
    date: '2023-05-15',
    description: 'Received damaged product from online store'
  },
  {
    id: '2',
    title: 'Service Delay',
    status: 'Resolved',
    date: '2023-04-20',
    description: 'Service technician arrived 2 hours late'
  }
];

const ComplaintHub: React.FC = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  // Simulate API call to fetch complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate random error (10% chance)
        if (Math.random() < 0.1) {
          throw new Error('Failed to fetch complaints');
        }
        
        setComplaints(mockComplaints);
        setError(null);
      } catch (err) {
        setError('Unable to load your complaints. Please try again later.');
        console.error('Error fetching complaints:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    // Simulate retry
    setTimeout(() => {
      setComplaints(mockComplaints);
      setIsLoading(false);
    }, 1000);
  };

  const filteredComplaints = activeTab === 'all' 
    ? complaints 
    : complaints.filter(complaint => 
        activeTab === 'in-progress' ? complaint.status === 'In Progress' : complaint.status === 'Resolved'
      );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Complaint Management Hub</h1>
      <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
        File new complaints or track existing ones. Our platform helps you manage your consumer rights effectively.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              File a New Complaint
            </CardTitle>
            <CardDescription>
              Submit a new consumer complaint to get assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Create a detailed complaint about your consumer rights issue. Our system will guide you through the process
              and ensure your complaint is properly filed.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => navigate('/complaint')}
            >
              File Complaint
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Track Your Complaints
            </CardTitle>
            <CardDescription>
              Check the status of your existing complaints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              View all your submitted complaints, their current status, and any updates or responses from our team.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => navigate('/tracking')}
            >
              Track Complaints
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-12 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Your Complaints
            </CardTitle>
            <CardDescription>
              View and manage your complaint activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={handleRetry}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </Alert>
            ) : isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : (
              <>
                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="all">All Complaints</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4">
                    {filteredComplaints.length > 0 ? (
                      filteredComplaints.map(complaint => (
                        <div key={complaint.id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                          <div>
                            <p className="font-medium">{complaint.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Status: <span className={`font-medium ${complaint.status === 'Resolved' ? 'text-green-500' : 'text-amber-500'}`}>
                                {complaint.status}
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground">Filed on: {complaint.date}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/tracking?id=${complaint.id}`)}>
                            View Details
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                        <div>
                          <p className="font-medium">No complaints found</p>
                          <p className="text-sm text-muted-foreground">
                            {activeTab === 'all' 
                              ? "You haven't filed any complaints yet" 
                              : `You don't have any ${activeTab === 'in-progress' ? 'in-progress' : 'resolved'} complaints`}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/complaint')}>
                          File Now
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="in-progress" className="space-y-4">
                    {filteredComplaints.length > 0 ? (
                      filteredComplaints.map(complaint => (
                        <div key={complaint.id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                          <div>
                            <p className="font-medium">{complaint.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Status: <span className="font-medium text-amber-500">In Progress</span>
                            </p>
                            <p className="text-xs text-muted-foreground">Filed on: {complaint.date}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/tracking?id=${complaint.id}`)}>
                            View Details
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                        <div>
                          <p className="font-medium">No in-progress complaints</p>
                          <p className="text-sm text-muted-foreground">You don't have any complaints currently in progress</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/complaint')}>
                          File Now
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="resolved" className="space-y-4">
                    {filteredComplaints.length > 0 ? (
                      filteredComplaints.map(complaint => (
                        <div key={complaint.id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                          <div>
                            <p className="font-medium">{complaint.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Status: <span className="font-medium text-green-500">Resolved</span>
                            </p>
                            <p className="text-xs text-muted-foreground">Filed on: {complaint.date}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/tracking?id=${complaint.id}`)}>
                            View Details
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                        <div>
                          <p className="font-medium">No resolved complaints</p>
                          <p className="text-sm text-muted-foreground">You don't have any resolved complaints yet</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/complaint')}>
                          File Now
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplaintHub; 