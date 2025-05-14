import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Bell, 
  BookOpen, 
  MessageSquare, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Shield,
  BarChart,
  Calendar,
  Users,
  ArrowRight,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('complaints');
  const [animatedStats, setAnimatedStats] = useState({
    activeComplaints: 0,
    notifications: 0,
    savedResources: 0,
    communityActivity: 0
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i: number) => ({ 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        delay: 0.1 * i
      }
    })
  };

  // Animate stats on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedStats(prev => {
          const newStats = { ...prev };
          if (newStats.activeComplaints < 3) newStats.activeComplaints += 1;
          if (newStats.notifications < 5) newStats.notifications += 1;
          if (newStats.savedResources < 8) newStats.savedResources += 1;
          if (newStats.communityActivity < 12) newStats.communityActivity += 1;
          
          if (
            newStats.activeComplaints === 3 && 
            newStats.notifications === 5 && 
            newStats.savedResources === 8 && 
            newStats.communityActivity === 12
          ) {
            clearInterval(interval);
          }
          
          return newStats;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Mock data for demonstration
  const recentComplaints = [
    {
      id: "COMP-2024-001",
      title: "Product Quality Issue",
      status: "in-progress",
      date: "2024-03-15",
      company: "TechCorp Inc.",
      description: "Received a damaged product that doesn't match the description on the website.",
      category: "E-commerce"
    },
    {
      id: "COMP-2024-002",
      title: "Service Delay",
      status: "resolved",
      date: "2024-03-10",
      company: "ServiceHub Co.",
      description: "Service was delayed by more than 2 weeks without any prior notification.",
      category: "Services"
    }
  ];

  const savedResources = [
    {
      id: 1,
      title: "Consumer Rights Guide",
      type: "PDF",
      date: "2024-03-01",
      category: "Legal",
      icon: <FileText className="h-4 w-4 text-primary" />
    },
    {
      id: 2,
      title: "Complaint Filing Tips",
      type: "Article",
      date: "2024-03-05",
      category: "Guides",
      icon: <BookOpen className="h-4 w-4 text-accent" />
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Consumer Rights Webinar",
      date: "2024-04-15",
      time: "3:00 PM",
      type: "Online"
    },
    {
      id: 2,
      title: "Community Discussion: E-commerce Issues",
      date: "2024-04-20",
      time: "5:30 PM",
      type: "Online"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-success/10 text-success border-success/20';
      case 'in-progress':
        return 'bg-info/10 text-info border-info/20';
      default:
        return 'bg-warning/10 text-warning border-warning/20';
    }
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="bg-primary/10 p-1.5 rounded-full mr-3 inline-flex"
              >
                <Shield className="h-5 w-5 text-primary" />
              </motion.div>
              Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome back! Here's your overview</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => navigate('/complaints')}
              className="bg-gradient-primary hover:shadow-glow text-primary-foreground transition-all duration-300 group"
            >
              File New Complaint
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                className="ml-2"
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border-border/40">
              <div className="h-1 w-full bg-primary/50"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Complaints</CardTitle>
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{animatedStats.activeComplaints}</div>
                <div className="flex items-center">
                  <TrendingUp className="h-3 w-3 text-success mr-1" />
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </div>
              </CardContent>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border-border/40">
              <div className="h-1 w-full bg-accent/50"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                <div className="bg-accent/10 p-1.5 rounded-full">
                  <Bell className="h-4 w-4 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{animatedStats.notifications}</div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-accent mr-1.5 animate-pulse" />
                  <p className="text-xs text-muted-foreground">
                    2 unread
                  </p>
                </div>
              </CardContent>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border-border/40">
              <div className="h-1 w-full bg-info/50"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saved Resources</CardTitle>
                <div className="bg-info/10 p-1.5 rounded-full">
                  <BookOpen className="h-4 w-4 text-info" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-info">{animatedStats.savedResources}</div>
                <div className="flex items-center">
                  <TrendingUp className="h-3 w-3 text-success mr-1" />
                  <p className="text-xs text-muted-foreground">
                    +3 this week
                  </p>
                </div>
              </CardContent>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-info/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border-border/40">
              <div className="h-1 w-full bg-warning/50"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Activity</CardTitle>
                <div className="bg-warning/10 p-1.5 rounded-full">
                  <MessageSquare className="h-4 w-4 text-warning" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{animatedStats.communityActivity}</div>
                <div className="flex items-center">
                  <Users className="h-3 w-3 text-success mr-1" />
                  <p className="text-xs text-muted-foreground">
                    +5 new discussions
                  </p>
                </div>
              </CardContent>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-warning/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs 
            defaultValue="complaints" 
            className="space-y-4"
            onValueChange={setActiveTab}
            value={activeTab}
          >
            <TabsList className="bg-secondary/50 p-1">
              <TabsTrigger 
                value="complaints"
                className="relative data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                <FileText className="h-4 w-4 mr-2" />
                Recent Complaints
                {activeTab === 'complaints' && (
                  <motion.span 
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="resources"
                className="relative data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Saved Resources
                {activeTab === 'resources' && (
                  <motion.span 
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="activity"
                className="relative data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                <BarChart className="h-4 w-4 mr-2" />
                Recent Activity
                {activeTab === 'activity' && (
                  <motion.span 
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="events"
                className="relative data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Upcoming Events
                {activeTab === 'events' && (
                  <motion.span 
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="complaints" className="space-y-4">
              <AnimatePresence>
                {recentComplaints.map((complaint, index) => (
                  <motion.div
                    key={complaint.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <Card className="border-border/40 overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <div className="bg-primary/10 p-2 rounded-lg mr-3 mt-0.5">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg font-medium">
                                {complaint.title}
                              </CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <span className="font-medium text-foreground/80">{complaint.company}</span>
                                <span className="mx-2 text-muted-foreground">•</span>
                                <span className="text-muted-foreground">{complaint.date}</span>
                                <span className="mx-2 text-muted-foreground">•</span>
                                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                  {complaint.category}
                                </span>
                              </CardDescription>
                            </div>
                          </div>
                          <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(complaint.status)} flex items-center`}>
                            {getStatusIcon(complaint.status)}
                            <span className="ml-1.5 capitalize">{complaint.status}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-4">
                          {complaint.description}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-0 border-t border-border/20 flex justify-between">
                        <div className="text-xs text-muted-foreground">
                          ID: {complaint.id}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/tracking?id=${complaint.id}`)}
                          className="text-primary hover:bg-primary/5 group"
                        >
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center mt-6"
              >
                <Button 
                  variant="outline" 
                  className="border-primary/20 text-primary hover:bg-primary/5"
                  onClick={() => navigate('/complaints')}
                >
                  View All Complaints
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <AnimatePresence>
                {savedResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <Card className="border-border/40 overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-start">
                          <div className="bg-muted p-2 rounded-lg mr-3 mt-0.5">
                            {resource.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg font-medium">
                              {resource.title}
                            </CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                {resource.type}
                              </span>
                              <span className="mx-2 text-muted-foreground">•</span>
                              <span className="text-muted-foreground">Saved on {resource.date}</span>
                              <span className="mx-2 text-muted-foreground">•</span>
                              <span className="text-xs font-medium text-muted-foreground">
                                {resource.category}
                              </span>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardFooter className="pt-4 border-t border-border/20 mt-4">
                        <div className="flex gap-2 w-full">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1 border-primary/20 text-primary hover:bg-primary/5"
                          >
                            View Resource
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="flex-1 text-muted-foreground hover:text-foreground"
                          >
                            Download
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center mt-6"
              >
                <Button 
                  variant="outline" 
                  className="border-primary/20 text-primary hover:bg-primary/5"
                  onClick={() => navigate('/resources')}
                >
                  View All Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card className="border-border/40 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-start gap-4 relative pl-6"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
                      <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-success flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-success-foreground"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Complaint Resolved</p>
                        <p className="text-xs text-muted-foreground">Your complaint against ServiceHub Co. has been resolved successfully.</p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-start gap-4 relative pl-6"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
                      <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-info flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-info-foreground"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New Comment</p>
                        <p className="text-xs text-muted-foreground">TechCorp Inc. has responded to your complaint about product quality.</p>
                        <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start gap-4 relative pl-6"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
                      <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-warning flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-warning-foreground"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Resource Saved</p>
                        <p className="text-xs text-muted-foreground">You saved "Consumer Rights Guide" to your resources.</p>
                        <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-start gap-4 relative pl-6"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
                      <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-accent flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-accent-foreground"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Community Interaction</p>
                        <p className="text-xs text-muted-foreground">You replied to a discussion about e-commerce refund policies.</p>
                        <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border/20 pt-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary hover:bg-primary/5 w-full justify-center"
                  >
                    View All Activity
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="events" className="space-y-4">
              <AnimatePresence>
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <Card className="border-border/40 overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-start">
                          <div className="bg-primary/10 p-2 rounded-lg mr-3 mt-0.5">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-medium">
                              {event.title}
                            </CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <span className="font-medium text-foreground/80">{event.date}</span>
                              <span className="mx-2 text-muted-foreground">•</span>
                              <span className="text-muted-foreground">{event.time}</span>
                              <span className="mx-2 text-muted-foreground">•</span>
                              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                {event.type}
                              </span>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardFooter className="pt-4 border-t border-border/20 mt-4 flex justify-between">
                        <div className="flex items-center">
                          <Sparkles className="h-3.5 w-3.5 text-primary mr-1.5" />
                          <span className="text-xs text-muted-foreground">Free to attend</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-primary/20 text-primary hover:bg-primary/5"
                        >
                          Add to Calendar
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center mt-6"
              >
                <Button 
                  variant="outline" 
                  className="border-primary/20 text-primary hover:bg-primary/5"
                  onClick={() => navigate('/events')}
                >
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard; 