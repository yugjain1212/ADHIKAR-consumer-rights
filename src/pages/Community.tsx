import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, Users, User } from 'lucide-react';
const Community = () => {
  return <Layout>
      <div className="min-h-screen bg-background">
        <section className="bg-gradient-to-r from-primary/80 to-primary/60 text-primary-foreground py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Consumer Community Forum</h1>
              <p className="text-xl mb-8">
                Connect with other consumers, share experiences, and find support for your consumer issues
              </p>
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90">
                <Users className="mr-2 h-5 w-5" />
                Join the Community
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Coming Soon!</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We're currently building our community platform. Sign up to be notified when it launches.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <Card className="p-6 bg-card text-card-foreground">
                <h3 className="text-xl font-semibold mb-4">Get Early Access</h3>
                <p className="text-muted-foreground mb-4">
                  Join our waitlist to be among the first to access our community forum when it launches.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                      Your Name
                    </label>
                    <input type="text" id="name" placeholder="Enter your name" className="w-full px-3 py-2 border border-border bg-input text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-gray-950" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                      Email Address
                    </label>
                    <input type="email" id="email" placeholder="Enter your email" className="w-full px-3 py-2 border border-border bg-input text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-[#638f3b]/[0.31]" />
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Join Waitlist
                  </Button>
                </div>
              </Card>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-md text-center">
                <div className="bg-secondary/30 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Discuss Consumer Issues</h3>
                <p className="text-muted-foreground">
                  Share your experiences and discuss consumer issues with others facing similar problems.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-md text-center">
                <div className="bg-secondary/30 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Join Collective Actions</h3>
                <p className="text-muted-foreground">
                  Participate in collective actions against unfair business practices and strengthen consumer voices.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-md text-center">
                <div className="bg-secondary/30 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Expert Advice</h3>
                <p className="text-muted-foreground">
                  Connect with legal experts and consumer advocates who can provide guidance on complex issues.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>;
};
export default Community;