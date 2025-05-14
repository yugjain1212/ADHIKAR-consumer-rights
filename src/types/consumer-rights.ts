import { IconName } from '@/utils/iconMappings';

export interface RightCategory {
  id: string;
  title: string;
  iconName: IconName;
  description: string;
}

export interface ConsumerRight {
  id: string;
  category: string;
  title: string;
  description: string;
  details: string[];
  legalReferences: string[];
  caseStudies: {
    title: string;
    summary: string;
  }[];
}
