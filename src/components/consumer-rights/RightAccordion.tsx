
import React from 'react';
import { ShieldCheck, Scale } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConsumerRight, RightCategory } from '@/types/consumer-rights';

interface RightAccordionProps {
  right: ConsumerRight;
  categories: RightCategory[];
}

const RightAccordion: React.FC<RightAccordionProps> = ({ right, categories }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={right.id} className="border border-border rounded-lg">
        <AccordionTrigger className="px-6 py-4 hover:bg-card">
          <div className="flex-1 text-left">
            <div className="flex items-center flex-wrap gap-2">
              <h3 className="text-xl font-semibold text-foreground">{right.title}</h3>
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                {categories.find(c => c.id === right.category)?.title || right.category}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{right.description}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 border-t border-border">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Key Points</TabsTrigger>
              <TabsTrigger value="legal">Legal References</TabsTrigger>
              <TabsTrigger value="cases">Case Studies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <ul className="space-y-2">
                {right.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 mt-1">
                      <ShieldCheck className="h-5 w-5 text-accent" />
                    </span>
                    <span className="ml-3 text-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="legal">
              <h4 className="font-semibold text-foreground mb-3">Legal Foundations</h4>
              <ul className="space-y-2">
                {right.legalReferences.map((ref, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 mt-1">
                      <Scale className="h-5 w-5 text-primary" />
                    </span>
                    <span className="ml-3 text-foreground">{ref}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="cases">
              <div className="space-y-4">
                {right.caseStudies.map((caseStudy, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-foreground mb-2">{caseStudy.title}</h4>
                      <p className="text-muted-foreground text-sm">{caseStudy.summary}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RightAccordion;
