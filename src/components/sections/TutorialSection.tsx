import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, MessageSquare, ClipboardList, 
  FileText, Info, ChevronRight, ChevronLeft,
  PlayCircle, Globe
} from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  image: string;
  altText: string;
}

interface TutorialCategory {
  id: string;
  title: {
    en: string;
    hi: string;
  };
  icon: React.ReactNode;
  steps: {
    en: TutorialStep[];
    hi: TutorialStep[];
  };
}

const TutorialSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('complaint');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const navigate = useNavigate();
  
  const tutorials: TutorialCategory[] = [
    {
      id: 'complaint',
      title: {
        en: 'How to File a Complaint',
        hi: 'शिकायत कैसे दर्ज करें'
      },
      icon: <ClipboardList className="h-5 w-5" />,
      steps: {
        en: [
          {
            title: 'Create an Account',
            description: 'Sign up for a free account on our platform to access all features. You can register using your email, phone number, or social media accounts.',
            image: '/images/tutorials/complaint-placeholder.svg',
            altText: 'Account creation screen'
          },
          {
            title: 'Navigate to Complaints Section',
            description: 'Click on the "Complaints" tab in the main navigation menu. This will take you to our complaint management system.',
            image: '/images/tutorials/complaint-placeholder.svg',
            altText: 'Complaints section navigation'
          },
          {
            title: 'Fill the Complaint Form',
            description: 'Complete the complaint form with all relevant details including the company name, purchase date, issue description, and any supporting documents or images.',
            image: '/images/tutorials/complaint-placeholder.svg',
            altText: 'Complaint form filling'
          },
          {
            title: 'Review and Submit',
            description: 'Review all the information you have provided, make any necessary corrections, and submit your complaint. You will receive a confirmation and tracking number.',
            image: '/images/tutorials/complaint-placeholder.svg',
            altText: 'Review and submit screen'
          },
          {
            title: 'Track Your Complaint',
            description: 'Use the tracking number to monitor the status of your complaint. You will receive notifications as your case progresses through the resolution process.',
            image: '/images/tutorials/complaint-placeholder.svg',
            altText: 'Complaint tracking dashboard'
          }
        ],
        hi: [
          {
            title: 'खाता बनाएं',
            description: 'सभी सुविधाओं का उपयोग करने के लिए हमारे प्लेटफॉर्म पर एक निःशुल्क खाता बनाएं। आप अपने ईमेल, फोन नंबर या सोशल मीडिया खातों का उपयोग करके पंजीकरण कर सकते हैं।',
            image: '/images/tutorials/complaint-placeholder.svg',
            altText: 'खाता बनाने की स्क्रीन'
          },
          {
            title: 'शिकायत अनुभाग पर जाएं',
            description: 'मुख्य नेविगेशन मेनू में "शिकायत" टैब पर क्लिक करें। यह आपको हमारी शिकायत प्रबंधन प्रणाली पर ले जाएगा।',
            image: '/images/tutorials/complaint-placeholder.svg',
            altText: 'शिकायत अनुभाग नेविगेशन'
          },
          {
            title: 'शिकायत फॉर्म भरें',
            description: 'कंपनी का नाम, खरीद की तारीख, समस्या का विवरण और कोई भी सहायक दस्तावेज़ या छवियां सहित सभी प्रासंगिक विवरणों के साथ शिकायत फॉर्म पूरा करें।',
            image: '/images/tutorials/complaint-placeholder.svg',
            altText: 'शिकायत फॉर्म भरना'
          },
          {
            title: 'समीक्षा करें और जमा करें',
            description: 'आपके द्वारा प्रदान की गई सभी जानकारी की समीक्षा करें, कोई भी आवश्यक सुधार करें, और अपनी शिकायत जमा करें। आपको एक पुष्टिकरण और ट्रैकिंग नंबर प्राप्त होगा।',
            image: '/images/tutorials/complaint-placeholder.svg',
            altText: 'समीक्षा और जमा करने की स्क्रीन'
          },
          {
            title: 'अपनी शिकायत को ट्रैक करें',
            description: 'अपनी शिकायत की स्थिति की निगरानी के लिए ट्रैकिंग नंबर का उपयोग करें। जैसे-जैसे आपका मामला समाधान प्रक्रिया के माध्यम से आगे बढ़ेगा, आपको सूचनाएं प्राप्त होंगी।',
            image: '/images/tutorials/complaint-placeholder.svg',
            altText: 'शिकायत ट्रैकिंग डैशबोर्ड'
          }
        ]
      }
    },
    {
      id: 'chatbot',
      title: {
        en: 'Using the AI Assistant',
        hi: 'AI सहायक का उपयोग करना'
      },
      icon: <MessageSquare className="h-5 w-5" />,
      steps: {
        en: [
          {
            title: 'Access the AI Assistant',
            description: 'Click on the "AI Assistant" tab in the main navigation menu or the chat icon in the bottom right corner of any page to start a conversation.',
            image: '/images/tutorials/chatbot-placeholder.svg',
            altText: 'AI Assistant access screen'
          },
          {
            title: 'Ask Your Question',
            description: 'Type your consumer rights question in the chat box. You can ask about specific laws, your rights in particular situations, or how to handle a dispute.',
            image: '/images/tutorials/chatbot-placeholder.svg',
            altText: 'Asking a question to the AI'
          },
          {
            title: 'Review the Response',
            description: 'The AI will provide a detailed answer based on Indian consumer protection laws. The response will include relevant legal provisions and practical advice.',
            image: '/images/tutorials/chatbot-placeholder.svg',
            altText: 'AI response review'
          },
          {
            title: 'Ask Follow-up Questions',
            description: 'If you need more information or clarification, you can ask follow-up questions. The AI maintains context of your conversation for more relevant answers.',
            image: '/images/tutorials/chatbot-placeholder.svg',
            altText: 'Follow-up questions screen'
          },
          {
            title: 'Save or Share the Information',
            description: 'Use the options to copy, save, or share the information provided by the AI. You can also rate the response to help us improve the system.',
            image: '/images/tutorials/chatbot-placeholder.svg',
            altText: 'Save and share options'
          }
        ],
        hi: [
          {
            title: 'AI सहायक तक पहुंचें',
            description: 'बातचीत शुरू करने के लिए मुख्य नेविगेशन मेनू में "AI सहायक" टैब पर या किसी भी पृष्ठ के निचले दाएं कोने में चैट आइकन पर क्लिक करें।',
            image: '/images/tutorials/chatbot-placeholder.svg',
            altText: 'AI सहायक एक्सेस स्क्रीन'
          },
          {
            title: 'अपना प्रश्न पूछें',
            description: 'चैट बॉक्स में अपना उपभोक्ता अधिकार प्रश्न टाइप करें। आप विशिष्ट कानूनों, विशेष परिस्थितियों में अपने अधिकारों, या विवाद को कैसे संभालना है, इसके बारे में पूछ सकते हैं।',
            image: '/images/tutorials/chatbot-placeholder.svg',
            altText: 'AI से प्रश्न पूछना'
          },
          {
            title: 'प्रतिक्रिया की समीक्षा करें',
            description: 'AI भारतीय उपभोक्ता संरक्षण कानूनों के आधार पर एक विस्तृत उत्तर प्रदान करेगा। प्रतिक्रिया में प्रासंगिक कानूनी प्रावधान और व्यावहारिक सलाह शामिल होगी।',
            image: '/images/tutorials/chatbot-placeholder.svg',
            altText: 'AI प्रतिक्रिया समीक्षा'
          },
          {
            title: 'फॉलो-अप प्रश्न पूछें',
            description: 'यदि आपको अधिक जानकारी या स्पष्टीकरण की आवश्यकता है, तो आप फॉलो-अप प्रश्न पूछ सकते हैं। AI अधिक प्रासंगिक उत्तरों के लिए आपकी बातचीत का संदर्भ बनाए रखता है।',
            image: '/images/tutorials/chatbot-placeholder.svg',
            altText: 'फॉलो-अप प्रश्न स्क्रीन'
          },
          {
            title: 'जानकारी सहेजें या साझा करें',
            description: 'AI द्वारा प्रदान की गई जानकारी को कॉपी, सहेजने या साझा करने के लिए विकल्पों का उपयोग करें। आप प्रणाली को बेहतर बनाने में मदद करने के लिए प्रतिक्रिया का मूल्यांकन भी कर सकते हैं।',
            image: '/images/tutorials/chatbot-placeholder.svg',
            altText: 'सहेजें और साझा करें विकल्प'
          }
        ]
      }
    },
    {
      id: 'resources',
      title: {
        en: 'Finding Legal Resources',
        hi: 'कानूनी संसाधन खोजना'
      },
      icon: <FileText className="h-5 w-5" />,
      steps: {
        en: [
          {
            title: 'Navigate to Resources Section',
            description: 'Click on the "Resources" tab in the main navigation menu to access our comprehensive library of consumer rights materials.',
            image: '/images/tutorials/resources-placeholder.svg',
            altText: 'Resources section navigation'
          },
          {
            title: 'Browse Categories',
            description: 'Explore different categories such as Consumer Protection Act, E-commerce Rules, Banking Regulations, and more to find relevant information.',
            image: '/images/tutorials/resources-placeholder.svg',
            altText: 'Resource categories browsing'
          },
          {
            title: 'Use Search Function',
            description: 'Use the search bar to quickly find specific topics, laws, or document templates related to your consumer rights query.',
            image: '/images/tutorials/resources-placeholder.svg',
            altText: 'Search function usage'
          },
          {
            title: 'Download Templates',
            description: 'Access and download ready-to-use templates for legal notices, complaint letters, and other documents to help with your consumer issues.',
            image: '/images/tutorials/resources-placeholder.svg',
            altText: 'Template download screen'
          },
          {
            title: 'Save for Later',
            description: 'Bookmark important resources or add them to your personal library for quick access later. You can also organize them into collections.',
            image: '/images/tutorials/resources-placeholder.svg',
            altText: 'Save resources feature'
          }
        ],
        hi: [
          {
            title: 'संसाधन अनुभाग पर जाएं',
            description: 'उपभोक्ता अधिकारों की हमारी व्यापक लाइब्रेरी तक पहुंचने के लिए मुख्य नेविगेशन मेनू में "संसाधन" टैब पर क्लिक करें।',
            image: '/images/tutorials/resources-placeholder.svg',
            altText: 'संसाधन अनुभाग नेविगेशन'
          },
          {
            title: 'श्रेणियां ब्राउज़ करें',
            description: 'प्रासंगिक जानकारी खोजने के लिए उपभोक्ता संरक्षण अधिनियम, ई-कॉमर्स नियम, बैंकिंग विनियम और अधिक जैसी विभिन्न श्रेणियों का अन्वेषण करें।',
            image: '/images/tutorials/resources-placeholder.svg',
            altText: 'संसाधन श्रेणियां ब्राउज़िंग'
          },
          {
            title: 'खोज फ़ंक्शन का उपयोग करें',
            description: 'अपने उपभोक्ता अधिकारों से संबंधित विशिष्ट विषयों, कानूनों या दस्तावेज़ टेम्पलेट्स को जल्दी से खोजने के लिए खोज बार का उपयोग करें।',
            image: '/images/tutorials/resources-placeholder.svg',
            altText: 'खोज फ़ंक्शन उपयोग'
          },
          {
            title: 'टेम्पलेट्स डाउनलोड करें',
            description: 'अपने उपभोक्ता मुद्दों में मदद के लिए कानूनी नोटिस, शिकायत पत्र और अन्य दस्तावेजों के लिए तुरंत उपयोग करने योग्य टेम्पलेट्स तक पहुंचें और डाउनलोड करें।',
            image: '/images/tutorials/resources-placeholder.svg',
            altText: 'टेम्पलेट डाउनलोड स्क्रीन'
          },
          {
            title: 'बाद के लिए सहेजें',
            description: 'बाद में त्वरित पहुंच के लिए महत्वपूर्ण संसाधनों को बुकमार्क करें या उन्हें अपनी व्यक्तिगत लाइब्रेरी में जोड़ें। आप उन्हें संग्रह में भी व्यवस्थित कर सकते हैं।',
            image: '/images/tutorials/resources-placeholder.svg',
            altText: 'संसाधन सहेजें सुविधा'
          }
        ]
      }
    }
  ];
  
  const currentTutorial = tutorials.find(t => t.id === activeCategory) || tutorials[0];
  const currentSteps = currentTutorial.steps[language];
  const currentStep = currentSteps[activeStep];
  
  const nextStep = () => {
    if (activeStep < currentSteps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };
  
  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-[10%] -right-[5%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Info className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {language === 'en' ? 'How to Use Our Platform' : 'हमारे प्लेटफॉर्म का उपयोग कैसे करें'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Step-by-step guides to help you navigate our platform and make the most of our features' 
              : 'हमारे प्लेटफॉर्म को नेविगेट करने और हमारी सुविधाओं का अधिकतम लाभ उठाने में आपकी मदद करने के लिए चरण-दर-चरण गाइड'}
          </p>
          
          <div className="flex justify-center mt-6 mb-8">
            <Button 
              variant={language === 'en' ? 'default' : 'outline'} 
              size="sm"
              className="rounded-r-none"
              onClick={() => setLanguage('en')}
            >
              <Globe className="h-4 w-4 mr-2" />
              English
            </Button>
            <Button 
              variant={language === 'hi' ? 'default' : 'outline'} 
              size="sm"
              className="rounded-l-none"
              onClick={() => setLanguage('hi')}
            >
              <Globe className="h-4 w-4 mr-2" />
              हिंदी
            </Button>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Tabs 
            defaultValue={activeCategory} 
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                {tutorials.map((tutorial) => (
                  <TabsTrigger 
                    key={tutorial.id} 
                    value={tutorial.id}
                    onClick={() => {
                      setActiveCategory(tutorial.id);
                      setActiveStep(0);
                    }}
                    className="flex items-center gap-2"
                  >
                    {tutorial.icon}
                    <span className="hidden sm:inline">{tutorial.title[language]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {tutorials.map((tutorial) => (
              <TabsContent key={tutorial.id} value={tutorial.id} className="mt-0">
                <Card className="border-border/40 shadow-md overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {/* Tutorial Image */}
                      <div className="bg-muted/30 flex items-center justify-center p-6 md:p-10 relative">
                        <div className="absolute top-4 left-4 z-10">
                          <Badge variant="subtle" size="lg" className="font-medium">
                            {language === 'en' ? 'Step' : 'चरण'} {activeStep + 1}/{currentSteps.length}
                          </Badge>
                        </div>
                        
                        <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border-4 border-background shadow-xl">
                          <img 
                            src={currentStep.image} 
                            alt={currentStep.altText}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="bg-background/80 hover:bg-background text-primary rounded-full h-12 w-12"
                              onClick={() => navigate(
                                activeCategory === 'complaint' ? '/complaints' : 
                                activeCategory === 'chatbot' ? '/chatbot' : '/resources'
                              )}
                            >
                              <PlayCircle className="h-8 w-8" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Tutorial Content */}
                      <div className="p-6 md:p-10">
                        <h3 className="text-2xl font-bold mb-4 text-foreground">
                          {currentStep.title}
                        </h3>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                          {currentStep.description}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <Button 
                            variant="outline" 
                            onClick={prevStep}
                            disabled={activeStep === 0}
                            className="text-muted-foreground"
                          >
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            {language === 'en' ? 'Previous' : 'पिछला'}
                          </Button>
                          
                          {activeStep < currentSteps.length - 1 ? (
                            <Button onClick={nextStep}>
                              {language === 'en' ? 'Next' : 'अगला'}
                              <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                          ) : (
                            <Button 
                              onClick={() => navigate(
                                activeCategory === 'complaint' ? '/complaints' : 
                                activeCategory === 'chatbot' ? '/chatbot' : '/resources'
                              )}
                            >
                              {language === 'en' ? 'Try it now' : 'अभी आज़माएं'}
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Step Indicators */}
                <div className="flex justify-center mt-8">
                  {currentSteps.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
                        index === activeStep 
                          ? 'bg-primary w-8' 
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                      onClick={() => setActiveStep(index)}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default TutorialSection;