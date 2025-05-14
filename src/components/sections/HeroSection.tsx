
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, ArrowRight, ShieldCheck, 
  MessageSquare, Users, FileText, TrendingUp,
  Shield, Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  userCount?: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ userCount = 50000 }) => {
  const navigate = useNavigate();
  
  const [animatedCount, setAnimatedCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedCount(prev => {
        if (prev < userCount) {
          return Math.min(prev + Math.ceil(userCount / 20), userCount);
        }
        clearInterval(interval);
        return userCount;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [userCount]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        delay: 0.4
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  const statsCounterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        delay: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Background decorative elements with animation */}
      <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none">
        <motion.div 
          animate={pulseAnimation}
          className="absolute -top-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-3xl"
        ></motion.div>
        <motion.div 
          animate={pulseAnimation}
          className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-3xl"
        ></motion.div>
        
        {/* Floating particles */}
        <motion.div 
          animate={floatingAnimation}
          className="absolute top-[20%] right-[20%] w-4 h-4 rounded-full bg-primary/20"
        ></motion.div>
        <motion.div 
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.5 }
          }}
          className="absolute top-[30%] left-[15%] w-3 h-3 rounded-full bg-accent/20"
        ></motion.div>
        <motion.div 
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 1 }
          }}
          className="absolute bottom-[25%] right-[30%] w-5 h-5 rounded-full bg-info/20"
        ></motion.div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants}>
              <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/5 text-primary inline-flex items-center">
                <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
                Consumer Empowerment Platform
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight"
            >
              Know Your Rights, <br />
              <span className="text-gradient-primary bg-clip-text text-transparent relative">
                Strengthen Your Voice
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-primary opacity-30"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                ></motion.span>
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl mb-8 text-muted-foreground max-w-xl mx-auto lg:mx-0"
            >
              India's most comprehensive platform for consumer rights education, 
              protection, and advocacy.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow text-primary-foreground transition-all duration-300 rounded-lg group"
                onClick={() => navigate('/rights')}
              >
                Explore Your Rights
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/20 text-foreground hover:bg-primary/5 transition-all duration-300 rounded-lg group overflow-hidden relative"
                onClick={() => navigate('/chatbot')}
              >
                <motion.span 
                  className="absolute inset-0 bg-primary/5 rounded-lg"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
                <span className="relative flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                  Chat with AI Assistant
                </span>
              </Button>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex items-center space-x-4 text-sm justify-center lg:justify-start"
            >
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-accent mr-2" />
                <span className="text-muted-foreground">Trusted by <span className="font-semibold text-foreground">{animatedCount.toLocaleString()}+</span> consumers</span>
              </div>
              
              <div className="hidden md:flex items-center">
                <CheckCircle className="h-5 w-5 text-accent mr-2" />
                <span className="text-muted-foreground">100% Free Resources</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            variants={cardVariants}
            className="relative"
          >
            {/* Main card with hover effects */}
            <div className="bg-card border border-border/40 rounded-xl shadow-lg p-6 md:p-8 transform transition-all duration-500 hover:shadow-xl hover:translate-y-[-5px] relative z-10 overflow-hidden group">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex items-center mb-4">
                <motion.div 
                  whileHover={{ rotate: 15 }}
                  className="bg-primary/10 p-2 rounded-lg mr-3"
                >
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-foreground">Consumer Protection Act, 2019</h3>
              </div>
              
              <p className="mb-6 text-muted-foreground">
                The Act provides for protection of the interests of consumers and for the said purpose, 
                to establish authorities for timely and effective administration and settlement of consumers' disputes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-accent/10 p-1.5 rounded-md mr-3 mt-0.5">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Right to Safety</h4>
                    <p className="text-sm text-muted-foreground">Protection against hazardous goods</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-primary/10 p-1.5 rounded-md mr-3 mt-0.5">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Right to Information</h4>
                    <p className="text-sm text-muted-foreground">Access to accurate product details</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-info/10 p-1.5 rounded-md mr-3 mt-0.5">
                    <Users className="h-4 w-4 text-info" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Right to Choose</h4>
                    <p className="text-sm text-muted-foreground">Access to variety of goods at competitive prices</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-warning/10 p-1.5 rounded-md mr-3 mt-0.5">
                    <TrendingUp className="h-4 w-4 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Right to be Heard</h4>
                    <p className="text-sm text-muted-foreground">Consumer interests receive due consideration</p>
                  </div>
                </motion.div>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full justify-between text-primary hover:bg-primary/5 group"
                onClick={() => navigate('/rights')}
              >
                Learn more about your rights
                <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
            
            {/* Decorative elements with animation */}
            <motion.div 
              animate={pulseAnimation}
              className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-full blur-xl"
            ></motion.div>
            <motion.div 
              animate={pulseAnimation}
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-xl"
            ></motion.div>
            
            {/* Floating shield icon */}
            <motion.div
              animate={floatingAnimation}
              className="absolute -top-4 -left-4 bg-gradient-primary p-2 rounded-full shadow-glow z-20"
            >
              <Shield className="h-5 w-5 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Stats section with animations */}
        <motion.div 
          variants={statsCounterVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 md:mt-24"
        >
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-card border border-border/40 rounded-lg p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-primary/5 transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500"></div>
            <div className="relative">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">6+</div>
              <div className="text-sm text-muted-foreground">Consumer Rights</div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-card border border-border/40 rounded-lg p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-accent/5 transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500"></div>
            <div className="relative">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">AI Assistant Support</div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-card border border-border/40 rounded-lg p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-info/5 transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500"></div>
            <div className="relative">
              <div className="text-3xl md:text-4xl font-bold text-info mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Legal Resources</div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-card border border-border/40 rounded-lg p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-warning/5 transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500"></div>
            <div className="relative">
              <div className="text-3xl md:text-4xl font-bold text-warning mb-2">5K+</div>
              <div className="text-sm text-muted-foreground">Resolved Complaints</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
