
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { 
  BookOpen, MessageSquare, Users, ArrowRight, 
  ShieldCheck, FileText, BarChart2, ClipboardList,
  Lightbulb, Scale, Sparkles, CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: string;
  bgColor: string;
}

interface FeaturesSectionProps {
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    title: 'Know Your Rights',
    description: 'Comprehensive guide to consumer rights in India with legal references and case studies.',
    icon: <ShieldCheck className="h-6 w-6" />,
    link: '/rights',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'AI Assistant',
    description: 'Get instant, personalized guidance on your specific consumer issues using our AI-powered chatbot.',
    icon: <MessageSquare className="h-6 w-6" />,
    link: '/chatbot',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    title: 'Community Forum',
    description: 'Connect with others, share experiences, and get advice from peers who faced similar situations.',
    icon: <Users className="h-6 w-6" />,
    link: '/community',
    color: 'text-info',
    bgColor: 'bg-info/10',
  },
  {
    title: 'Legal Resources',
    description: 'Access templates, guides, and legal documents to help you navigate consumer protection laws.',
    icon: <FileText className="h-6 w-6" />,
    link: '/resources',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    title: 'Complaint Tracking',
    description: 'File and track your consumer complaints with businesses and regulatory authorities.',
    icon: <ClipboardList className="h-6 w-6" />,
    link: '/complaints',
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
  {
    title: 'Consumer Insights',
    description: 'Stay informed with the latest trends, news, and developments in consumer protection.',
    icon: <Lightbulb className="h-6 w-6" />,
    link: '/insights',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
];

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features = defaultFeatures }) => {
  const navigate = useNavigate();
  
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
    visible: (i: number) => ({ 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        delay: 0.1 * i
      }
    })
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
  
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <motion.div 
          animate={pulseAnimation}
          className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-3xl"
        ></motion.div>
        <motion.div 
          animate={pulseAnimation}
          className="absolute bottom-[20%] left-[10%] w-[25%] h-[25%] rounded-full bg-accent/5 blur-3xl"
        ></motion.div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="bg-primary/10 p-2 rounded-lg"
            >
              <Sparkles className="h-6 w-6 text-primary" />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">How We Empower Consumers</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tools and resources designed to help you understand, protect, and advocate for your consumer rights
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-card border-border/40 transition-all duration-300 group overflow-hidden h-full flex flex-col">
                <div className={`h-1.5 w-full ${feature.bgColor.replace('/10', '/50')}`}></div>
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <motion.div 
                      whileHover={{ rotate: 15 }}
                      className={`${feature.bgColor} ${feature.color} p-2.5 rounded-lg mr-3 transition-all duration-300`}
                    >
                      {feature.icon}
                    </motion.div>
                    <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 mt-auto">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-between ${feature.color} hover:bg-muted transition-all duration-300 group`}
                    onClick={() => navigate(feature.link)}
                  >
                    <span>Explore {feature.title}</span>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center"
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="inline-flex items-center justify-center p-1 rounded-full bg-muted border border-border/40 mb-8 cursor-pointer"
          >
            <div className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              For Businesses
            </div>
            <div className="px-4 py-1 text-sm font-medium text-muted-foreground">
              For Regulators
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ 
              y: -5, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            className="bg-gradient-card border border-border/40 rounded-xl p-8 max-w-4xl mx-auto shadow-md relative overflow-hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
              <motion.div 
                animate={pulseAnimation}
                className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"
              ></motion.div>
              <motion.div 
                animate={pulseAnimation}
                className="absolute bottom-0 left-0 w-[30%] h-[30%] rounded-full bg-accent/5 blur-3xl"
              ></motion.div>
            </div>
            
            <div className="relative z-10">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="flex items-center justify-center mb-6"
              >
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Scale className="h-8 w-8 text-primary" />
                </div>
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4">Are you a business looking to improve consumer trust?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our platform to demonstrate your commitment to consumer rights, 
                resolve complaints efficiently, and build a reputation for excellent customer service.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-glow text-primary-foreground transition-all duration-300 group"
                  onClick={() => navigate('/business/register')}
                >
                  <span className="relative z-10">Register Your Business</span>
                  <motion.div
                    initial={{ x: 0, opacity: 0 }}
                    whileHover={{ x: 5, opacity: 1 }}
                    className="ml-2"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </motion.div>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary/20 text-foreground hover:bg-primary/5 transition-all duration-300 group overflow-hidden relative"
                  onClick={() => navigate('/business/learn-more')}
                >
                  <motion.span 
                    className="absolute inset-0 bg-primary/5 rounded-lg"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                  <span className="relative z-10">Learn More</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
