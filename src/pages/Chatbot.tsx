import React from 'react';
import Layout from '@/components/layout/Layout';
import { FileText, MessageSquare, Share2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ChatInterface from '@/components/chatbot/ChatInterface';

const Chatbot: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <section className="bg-gradient-to-r from-primary/80 to-primary/60 text-primary-foreground py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Consumer Rights Assistant</h1>
              <p className="text-xl mb-8">
                Get instant, personalized guidance on your consumer rights and issues
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Chat Interface */}
              <div className="lg:col-span-3 order-2 lg:order-1">
                <ChatInterface />
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="bg-card rounded-lg shadow-md p-6 sticky top-24 border border-border">
                  <h3 className="text-lg font-semibold mb-4">How Can I Help You?</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    I'm your AI assistant for consumer rights in India. Ask me about:
                  </p>
                  
                  <ul className="space-y-3">
                    <li className="flex">
                      <FileText className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1" />
                      <span className="text-sm text-muted-foreground">Understanding your consumer rights and protections</span>
                    </li>
                    <li className="flex">
                      <FileText className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1" />
                      <span className="text-sm text-muted-foreground">How to file complaints and seek redressal</span>
                    </li>
                    <li className="flex">
                      <FileText className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1" />
                      <span className="text-sm text-muted-foreground">Guidance on specific product or service issues</span>
                    </li>
                    <li className="flex">
                      <FileText className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1" />
                      <span className="text-sm text-muted-foreground">Information about consumer protection laws</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-medium mb-3">Important Note</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      This AI assistant provides general guidance based on Indian consumer protection laws. For specific legal advice, please consult a qualified legal professional.
                    </p>
                  </div>
                  <Tabs defaultValue="chat" className="mt-4">
                    <TabsList className="grid w-full grid-cols-2 bg-secondary">
                      <TabsTrigger value="chat" className="text-sm data-[state=active]:bg-background">Chat Now</TabsTrigger>
                      <TabsTrigger value="rights" className="text-sm data-[state=active]:bg-background">View Rights</TabsTrigger>
                    </TabsList>
                    <TabsContent value="chat" className="mt-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        Start typing your question in the chat to get immediate assistance.
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Focus on Chat
                      </Button>
                    </TabsContent>
                    <TabsContent value="rights" className="mt-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        Browse our comprehensive guide to consumer rights in India.
                      </p>
                      <Button className="w-full" variant="outline">
                        <Share2 className="mr-2 h-4 w-4" />
                        View Rights Guide
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Chatbot;