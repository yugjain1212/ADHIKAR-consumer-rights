import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, ThumbsUp, ThumbsDown, Copy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { chatWithMistral, ChatMessage } from '@/api/chatbot';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions] = useState<string[]>([
    "What are my rights as a consumer?",
    "How do I file a complaint against an e-commerce company?",
    "What is the Consumer Protection Act?",
    "Can I return a product after purchase?",
    "What to do if a company refuses refund?"
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Welcome message on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messages.length === 0) {
        setIsTyping(true);
        setTimeout(() => {
          setMessages([{
            role: 'assistant',
            content: 'Hello! I\'m your AI consumer rights assistant. How can I help you today? You can ask me about your consumer rights, how to file complaints, or get guidance on specific issues.'
          }]);
          setIsTyping(false);
        }, 1500);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await chatWithMistral([...messages, userMessage]);
      
      if (response.success) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.message
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        }]);
      }
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Message copied to clipboard');
  };

  const shareMessage = (content: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Consumer Rights Information',
        text: content,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      copyMessage(content);
      toast.success('Message copied for sharing');
    }
  };

  const rateMessage = (isPositive: boolean) => {
    toast.success(`Thank you for your ${isPositive ? 'positive' : 'negative'} feedback!`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto my-8 shadow-lg border-border/40 overflow-hidden">
        <CardHeader className="bg-gradient-card border-b border-border/20">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>AI Consumer Rights Assistant</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/20">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div className="flex items-start max-w-[85%] group">
                      {message.role === 'assistant' && (
                        <div className="bg-primary/10 p-1.5 rounded-full mr-2 mt-1 flex-shrink-0">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      
                      <div
                        className={`rounded-lg p-3 shadow-sm ${
                          message.role === 'user'
                            ? 'bg-gradient-primary text-primary-foreground rounded-tr-none'
                            : 'bg-card border border-border/40 rounded-tl-none'
                        }`}
                      >
                        {message.content}
                        
                        {message.role === 'assistant' && (
                          <div className="mt-2 pt-2 border-t border-border/20 opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={() => copyMessage(message.content)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={() => shareMessage(message.content)}
                            >
                              <Share2 className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={() => rateMessage(true)}
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={() => rateMessage(false)}
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {message.role === 'user' && (
                        <div className="bg-primary p-1.5 rounded-full ml-2 mt-1 flex-shrink-0">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex justify-start"
                  >
                    <div className="flex items-start max-w-[85%]">
                      <div className="bg-primary/10 p-1.5 rounded-full mr-2 mt-1">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-card border border-border/40 rounded-lg rounded-tl-none p-3 shadow-sm">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                            className="w-2 h-2 bg-primary/40 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                            className="w-2 h-2 bg-primary/60 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                            className="w-2 h-2 bg-primary/80 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            
            {messages.length === 0 && !isTyping && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center p-6"
                >
                  <div className="bg-primary/10 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Consumer Rights AI Assistant</h3>
                  <p className="text-muted-foreground mb-6">
                    Ask me anything about your consumer rights, how to file complaints, 
                    or get guidance on specific consumer issues.
                  </p>
                </motion.div>
              </div>
            )}
            
            {messages.length > 0 && messages.length < 3 && (
              <div className="px-4 py-2 overflow-x-auto whitespace-nowrap flex gap-2 border-t border-border/20">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="whitespace-nowrap text-xs border-primary/20 hover:bg-primary/5"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
            
            <div className="p-4 border-t border-border/20 bg-card">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your consumer rights question..."
                  disabled={isLoading}
                  className="flex-1 border-border/40 focus:border-primary/30 shadow-sm"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="bg-gradient-primary hover:shadow-glow text-primary-foreground transition-all duration-300"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-muted/20 border-t border-border/20 py-2 px-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Sparkles className="h-3 w-3 mr-1 text-primary" />
            <span>Powered by AI • Responses may not always be accurate • Verify important information</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Chatbot; 