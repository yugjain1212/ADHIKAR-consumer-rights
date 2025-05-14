
import React from 'react';
import { ExternalLink } from 'lucide-react';

const GovernmentResources = () => {
  return (
    <div className="bg-secondary/20 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Official Government Resources</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a 
          href="https://consumeraffairs.nic.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-start p-4 bg-card rounded-lg hover:shadow-dark-lg transition-shadow"
        >
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 text-primary">
              Department of Consumer Affairs
            </h3>
            <p className="text-muted-foreground text-sm">
              Official website of the Department of Consumer Affairs, Government of India
            </p>
            <div className="flex items-center mt-2 text-sm text-primary">
              <ExternalLink className="h-4 w-4 mr-1" />
              Visit Website
            </div>
          </div>
        </a>
        
        <a 
          href="https://consumerhelpline.gov.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-start p-4 bg-card rounded-lg hover:shadow-dark-lg transition-shadow"
        >
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 text-primary">
              National Consumer Helpline
            </h3>
            <p className="text-muted-foreground text-sm">
              Portal for filing consumer complaints and seeking guidance (Toll-free: 1800-11-4000)
            </p>
            <div className="flex items-center mt-2 text-sm text-primary">
              <ExternalLink className="h-4 w-4 mr-1" />
              Visit Website
            </div>
          </div>
        </a>
        
        <a 
          href="https://ncdrc.nic.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-start p-4 bg-card rounded-lg hover:shadow-dark-lg transition-shadow"
        >
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 text-primary">
              National Consumer Disputes Redressal Commission
            </h3>
            <p className="text-muted-foreground text-sm">
              Official website of the apex consumer disputes redressal forum
            </p>
            <div className="flex items-center mt-2 text-sm text-primary">
              <ExternalLink className="h-4 w-4 mr-1" />
              Visit Website
            </div>
          </div>
        </a>
        
        <a 
          href="https://www.mca.gov.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-start p-4 bg-card rounded-lg hover:shadow-dark-lg transition-shadow"
        >
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 text-primary">
              Ministry of Corporate Affairs
            </h3>
            <p className="text-muted-foreground text-sm">
              Resources related to corporate regulations and consumer protection
            </p>
            <div className="flex items-center mt-2 text-sm text-primary">
              <ExternalLink className="h-4 w-4 mr-1" />
              Visit Website
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default GovernmentResources;
