import React from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RightCategory } from '@/types/consumer-rights';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getIcon } from '@/utils/iconMappings';

interface CategoriesSidebarProps {
  categories: RightCategory[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChatWithAI = () => {
    navigate('/chatbot');
    toast({
      title: "Opening AI Assistant",
      description: "You'll be redirected to our AI chatbot to help with your consumer issues."
    });
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6 sticky top-24">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Categories</h3>
      <ul className="space-y-2">
        <li>
          <button
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              activeCategory === 'all' 
                ? 'bg-primary/20 text-primary' 
                : 'text-muted-foreground hover:bg-card'
            }`}
            onClick={() => setActiveCategory('all')}
          >
            All Rights
          </button>
        </li>
        {categories.map(category => (
          <li key={category.id}>
            <button
              className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                activeCategory === category.id 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-muted-foreground hover:bg-card'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="mr-2">{getIcon(category.iconName)}</span>
              {category.title}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <h4 className="font-semibold text-foreground flex items-center">
          <Info className="h-5 w-5 mr-2 text-accent" />
          Need Help?
        </h4>
        <p className="text-sm text-muted-foreground mt-2">
          Not sure about your rights? Chat with our AI assistant for personalized guidance.
        </p>
        <Button 
          className="w-full mt-3 bg-accent hover:bg-accent/90 text-accent-foreground"
          onClick={handleChatWithAI}
        >
          Talk to AI Assistant
        </Button>
      </div>
    </div>
  );
};

export default CategoriesSidebar;
