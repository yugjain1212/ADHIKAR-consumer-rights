
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Download, Bookmark, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SearchHeader from '@/components/consumer-rights/SearchHeader';
import CategoriesSidebar from '@/components/consumer-rights/CategoriesSidebar';
import RightAccordion from '@/components/consumer-rights/RightAccordion';
import { categories, consumerRights } from '@/data/consumerRights';

const ConsumerRights: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  const filteredRights = consumerRights.filter(right => {
    const matchesSearch = right.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         right.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || right.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <SearchHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <section className="py-12 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <CategoriesSidebar 
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>

            <div className="lg:col-span-3">
              <div className="bg-card rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    {activeCategory === 'all' ? 'All Consumer Rights' : 
                     categories.find(c => c.id === activeCategory)?.title || 'Consumer Rights'}
                  </h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>

                {activeCategory !== 'all' && (
                  <p className="text-muted-foreground mb-6">
                    {categories.find(c => c.id === activeCategory)?.description}
                  </p>
                )}

                <p className="text-sm text-muted-foreground mb-6">
                  Showing {filteredRights.length} of {consumerRights.length} rights
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>

                <div className="space-y-6">
                  {filteredRights.length > 0 ? (
                    filteredRights.map(right => (
                      <RightAccordion 
                        key={right.id} 
                        right={right} 
                        categories={categories}
                      />
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">No rights found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or category filter to find what you're looking for.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-accent/80 to-accent/60 rounded-lg shadow-md p-8 text-accent-foreground">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Have a Specific Consumer Issue?</h3>
                    <p className="text-accent-foreground/90">
                      Get personalized guidance from our AI assistant to understand your rights and next steps.
                    </p>
                  </div>
                  <Button 
                    className="mt-4 md:mt-0 bg-background text-foreground hover:bg-background/90"
                    onClick={() => navigate('/chatbot')}
                  >
                    Chat with AI Assistant
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ConsumerRights;
