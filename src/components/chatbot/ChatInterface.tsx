import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { chatbotApi } from '@/services/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface SuggestedQuestion {
  id: string;
  text: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m your Consumer Rights Assistant. How can I help you today?',
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const suggestedQuestions: SuggestedQuestion[] = [
    { id: '1', text: 'What are my rights if a product is defective?' },
    { id: '2', text: 'How do I file a complaint against an e-commerce company?' },
    { id: '3', text: 'Can I get a refund for a service that didn\'t meet the promised standards?' },
    { id: '4', text: 'What are the time limits for filing a consumer complaint?' },
    { id: '5', text: 'Are there any specific rights for online shopping?' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load session from localStorage if available
  useEffect(() => {
    const savedSessionId = localStorage.getItem('chatSessionId');
    if (savedSessionId) {
      setSessionId(savedSessionId);
      loadChatHistory(savedSessionId);
    }
  }, []);

  const loadChatHistory = async (sessionId: string) => {
    try {
      const response = await chatbotApi.getChatHistory(sessionId);
      if (response.success && response.messages && response.messages.length > 0) {
        const formattedMessages = response.messages.map((msg: any, index: number) => ({
          id: index.toString(),
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
          timestamp: new Date()
        }));
        
        if (formattedMessages.length > 0) {
          setMessages(formattedMessages);
        }
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      // If we can't load history, just continue with a new session
      // Clear the session ID from localStorage to start fresh
      localStorage.removeItem('chatSessionId');
      setSessionId(null);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isSending) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsSending(true);

    try {
      // Format messages for the API - only include the last 10 messages to avoid token limits
      const recentMessages = messages
        .slice(-10)
        .filter(msg => msg.id !== '1' || messages.length === 1) // Keep the first welcome message only if it's the only message
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));
      
      // Add the new user message
      recentMessages.push({
        role: 'user',
        content: newUserMessage.content
      });

      // Send to backend API
      const response = await chatbotApi.sendMessage(recentMessages, sessionId);
      
      if (response.success) {
        // Save the session ID if we got a new one
        if (response.session_id && !sessionId) {
          setSessionId(response.session_id);
          localStorage.setItem('chatSessionId', response.session_id);
        }
        
        const newBotMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.message,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, newBotMessage]);
      } else {
        // Handle error
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again later.',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
        
        toast({
          title: "Error",
          description: response.error || "Failed to get a response",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      let errorDescription = "Failed to communicate with the chatbot service";
      
      // Try to extract more specific error information
      if (error.response && error.response.data && error.response.data.error) {
        errorDescription = error.response.data.error;
      } else if (error.message) {
        errorDescription = error.message;
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: errorDescription,
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (messageId: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessageId(messageId);
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied to your clipboard"
      });
      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
    });
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const handleFeedback = (isPositive: boolean) => {
    toast({
      title: isPositive ? "Thanks for your feedback!" : "We'll improve our answers",
      description: isPositive ? "We're glad our response was helpful." : "Thanks for letting us know. We'll use this to improve our responses."
    });
  };

  return (
    <div className="h-[600px] flex flex-col bg-card text-card-foreground rounded-lg border shadow-sm">
      <div className="p-4 bg-secondary border-b border-border flex justify-between items-center">
        <div className="flex items-center">
          <Bot className="h-6 w-6 text-primary mr-2" />
          <h2 className="font-semibold">Consumer Rights AI Assistant</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-card border border-border text-card-foreground'
              }`}
            >
              <div className="flex items-center mb-2">
                {message.role === 'assistant' 
                  ? <Bot className="h-5 w-5 mr-2 text-primary" /> 
                  : <User className="h-5 w-5 mr-2 text-primary-foreground" />
                }
                <span className="font-medium">
                  {message.role === 'assistant' ? 'AI Assistant' : 'You'}
                </span>
                <span className="text-xs ml-2 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{message.content}</p>
              
              {message.role === 'assistant' && (
                <div className="mt-3 pt-2 border-t border-border flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground h-7 hover:text-primary" 
                      onClick={() => handleFeedback(true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground h-7 hover:text-primary" 
                      onClick={() => handleFeedback(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-down"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"/></svg>
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground h-7 hover:text-primary" 
                    onClick={() => handleCopyMessage(message.id, message.content)}
                  >
                    {copiedMessageId === message.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-border bg-card">
        <div className="flex">
          <Textarea 
            placeholder="Type your question here..." 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={handleKeyDown} 
            className="min-h-[80px] resize-none bg-input text-foreground border-border" 
          />
          <Button 
            className="ml-2 self-end bg-primary hover:bg-primary/90 text-primary-foreground" 
            onClick={handleSendMessage} 
            disabled={isSending || !input.trim()}
          >
            {isSending ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>
        
        {messages.length === 1 && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map(question => (
                <Badge 
                  key={question.id} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-secondary py-1.5 border-border text-foreground" 
                  onClick={() => handleSuggestedQuestion(question.text)}
                >
                  {question.text}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;