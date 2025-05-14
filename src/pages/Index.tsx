
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import TutorialSection from '@/components/sections/TutorialSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection userCount={50000} />
      <FeaturesSection />
      <TutorialSection />
      <TestimonialsSection />
    </Layout>
  );
};

export default Index;
