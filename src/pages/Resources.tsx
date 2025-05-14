
import React from 'react';
import Layout from '@/components/layout/Layout';
import ResourcesHero from '@/components/resources/ResourcesHero';
import ResourceCards from '@/components/resources/ResourceCards';
import LegalDocuments from '@/components/resources/LegalDocuments';
import FeaturedResources from '@/components/resources/FeaturedResources';
import GovernmentResources from '@/components/resources/GovernmentResources';

const Resources = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <ResourcesHero />
        
        <section className="py-12 bg-background">
          <div className="container-custom">
            <ResourceCards />
            <LegalDocuments />
            <FeaturedResources />
            <GovernmentResources />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Resources;
