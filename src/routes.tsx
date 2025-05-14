import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingFallback from './components/LoadingFallback';

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const ConsumerRights = React.lazy(() => import('./pages/ConsumerRights'));
const Community = React.lazy(() => import('./pages/Community'));
const Resources = React.lazy(() => import('./pages/Resources'));
const Documents = React.lazy(() => import('./pages/Documents'));
const ComplaintHub = React.lazy(() => import('./pages/ComplaintHub'));
const Chatbot = React.lazy(() => import('./pages/Chatbot'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rights" element={<ConsumerRights />} />
        <Route path="/community" element={<Community />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/complaints" element={<ComplaintHub />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes; 