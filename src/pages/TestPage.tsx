import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Test Page</h1>
      <p className="mb-4">This is a simple test page to check if routing is working correctly.</p>
      <div className="p-4 bg-blue-100 rounded-lg">
        <p>If you can see this, the page is loading correctly!</p>
      </div>
    </div>
  );
};

export default TestPage;