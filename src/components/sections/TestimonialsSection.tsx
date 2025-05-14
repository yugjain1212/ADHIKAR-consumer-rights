import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, ArrowRight, ArrowLeft, 
  Star, Quote, Shield, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  name: string;
  location: string;
  text: string;
  image?: string;
  rating: number;
  company?: string;
  issue: string;
  outcome: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    text: "Thanks to this platform, I was able to resolve my issue with an online retailer who refused to refund my money for a defective product. The step-by-step guidance and template letters provided by Adhikar were invaluable in helping me understand my rights and take appropriate action.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    company: "MegaMart Online",
    issue: "Refund Denial",
    outcome: "Full Refund Received"
  },
  {
    name: "Rajesh Patel",
    location: "Ahmedabad, Gujarat",
    text: "When my new smartphone stopped working within a week of purchase, the retailer initially refused to replace it. The consumer rights information on this platform helped me understand my legal options under the Consumer Protection Act. After following the recommended approach, I received a full replacement!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    company: "TechZone",
    issue: "Defective Product",
    outcome: "Product Replacement"
  },
  {
    name: "Anita Desai",
    location: "Bangalore, Karnataka",
    text: "The community support was amazing. I was facing issues with misleading advertisements from a fitness company. Through the forum, I learned so much from others who had similar experiences with the same company. The AI assistant also provided relevant legal provisions I could cite in my complaint.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4,
    company: "FitLife Pro",
    issue: "Misleading Advertisement",
    outcome: "Partial Refund & Policy Change"
  },
  {
    name: "Vikram Singh",
    location: "New Delhi",
    text: "After months of trying to get my insurance claim processed, I was at my wit's end. The complaint template and escalation strategy provided by Adhikar helped me formulate a strong case. Within two weeks of following their approach, my claim was approved. I am extremely grateful for this resource!",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5,
    company: "SecureLife Insurance",
    issue: "Claim Rejection",
    outcome: "Claim Approved"
  },
  {
    name: "Meera Krishnan",
    location: "Chennai, Tamil Nadu",
    text: "I had been charged hidden fees by my bank for services I never signed up for. Using the knowledge from this platform about banking regulations and consumer financial rights, I was able to contest these charges successfully and get a full refund. The platform resources are truly empowering!",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
    company: "National Banking Corp",
    issue: "Hidden Charges",
    outcome: "Full Refund & Fee Waiver"
  }
];

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials = defaultTestimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={cn(
          "h-4 w-4", 
          i < rating ? "text-warning fill-warning" : "text-muted-foreground"
        )} 
      />
    ));
  };
  
  return (
    <>
      <section className="py-24 bg-muted/20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute top-[20%] -left-[5%] w-[30%] h-[30%] rounded-full bg-accent/5 blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Quote className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real experiences from consumers who successfully protected their rights
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-card border border-border/40 rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Testimonial Navigation - Mobile */}
                <div className="md:hidden flex justify-between items-center p-4 border-b border-border/40">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={prevTestimonial}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  
                  <div className="flex space-x-1">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          index === activeIndex 
                            ? "bg-primary w-6" 
                            : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        )}
                        onClick={() => goToTestimonial(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={nextTestimonial}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Testimonial Sidebar */}
                <div className="hidden md:block md:col-span-2 bg-muted/30 border-r border-border/40">
                  {testimonials.map((testimonial, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-full text-left p-6 border-b border-border/40 transition-all duration-300",
                        index === activeIndex 
                          ? "bg-primary/10 border-l-4 border-l-primary" 
                          : "hover:bg-muted/50 border-l-4 border-l-transparent"
                      )}
                      onClick={() => goToTestimonial(index)}
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-border/40">
                          {testimonial.image ? (
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center mb-1">
                          <div className="text-xs font-medium text-muted-foreground mr-2">Issue:</div>
                          <div className="text-xs font-medium text-foreground">{testimonial.issue}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-xs font-medium text-muted-foreground mr-2">Outcome:</div>
                          <div className="text-xs font-medium text-accent">{testimonial.outcome}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Testimonial Content */}
                <div className="md:col-span-3 p-6 md:p-8">
                  <div className="flex items-center mb-6">
                    <div className="flex">{renderStars(testimonials[activeIndex].rating)}</div>
                    <div className="ml-2 text-sm text-muted-foreground">
                      {testimonials[activeIndex].rating.toFixed(1)} out of 5
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/10" />
                    <p className="text-foreground text-lg leading-relaxed mb-6 pl-6">
                      "{testimonials[activeIndex].text}"
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-8">
                    <div>
                      <h4 className="font-semibold text-foreground text-lg">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[activeIndex].location}
                      </p>
                    </div>
                    
                    {testimonials[activeIndex].company && (
                      <div className="bg-muted/40 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground">
                        vs. {testimonials[activeIndex].company}
                      </div>
                    )}
                  </div>
                  
                  {/* Desktop Navigation */}
                  <div className="hidden md:flex justify-end mt-8">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={prevTestimonial}
                      className="mr-2 text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={nextTestimonial}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                className="text-primary border-primary/20 hover:bg-primary/5"
                onClick={() => navigate('/success-stories')}
              >
                View All Success Stories
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 p-3 rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Stand Up for Your Rights?</h2>
              <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
                Join thousands of Indian consumers who are taking control of their purchasing decisions 
                and holding businesses accountable.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
                  <div className="text-4xl font-bold mb-2">50K+</div>
                  <div className="text-sm opacity-80">Empowered Consumers</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
                  <div className="text-4xl font-bold mb-2">₹1.2Cr</div>
                  <div className="text-sm opacity-80">Compensation Secured</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
                  <div className="text-4xl font-bold mb-2">92%</div>
                  <div className="text-sm opacity-80">Resolution Rate</div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => navigate('/resources')}
                >
                  Browse Knowledge Base
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => navigate('/chatbot')}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Ask Our AI Assistant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
