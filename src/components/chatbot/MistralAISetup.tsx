
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { setMistralApiKey, getMistralApiKey } from '@/services/mistralAI';
import { toast } from 'sonner';

interface MistralAISetupProps {
  onSetup: () => void;
}

const MistralAISetup: React.FC<MistralAISetupProps> = ({ onSetup }) => {
  const [apiKey, setApiKey] = useState(getMistralApiKey() || '');
  
  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }
    
    const success = setMistralApiKey(apiKey);
    if (success) {
      toast.success('API key saved successfully');
      onSetup();
    } else {
      toast.error('Failed to save API key');
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Setup Mistral AI</CardTitle>
        <CardDescription>
          You need a Mistral AI API key to use the AI assistant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>API Key Required</AlertTitle>
          <AlertDescription>
            Your API key is stored locally and never sent to our servers. You can get an API key from the 
            <a href="https://console.mistral.ai/" target="_blank" rel="noopener noreferrer" className="text-primary underline ml-1">
              Mistral AI Console
            </a>.
          </AlertDescription>
        </Alert>
        
        <div className="grid gap-4">
          <Input
            type="password"
            placeholder="Enter your Mistral AI API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveKey} className="w-full">
          Save API Key & Continue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MistralAISetup;
