import { ConsumerRight, RightCategory } from '@/types/consumer-rights';

export const categories: RightCategory[] = [
  {
    id: 'basic',
    title: 'Basic Rights',
    iconName: 'shield',
    description: 'Fundamental rights guaranteed to all consumers under Indian law.'
  },
  {
    id: 'products',
    title: 'Product Safety',
    iconName: 'cart',
    description: 'Rights related to product safety, quality, and standards.'
  },
  {
    id: 'services',
    title: 'Service Standards',
    iconName: 'file',
    description: 'Standards and rights related to service providers and agreements.'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    iconName: 'cart',
    description: 'Special provisions for online shopping and digital services.'
  },
  {
    id: 'legal',
    title: 'Legal Remedies',
    iconName: 'scale',
    description: 'How to seek redressal for consumer rights violations.'
  }
];

export const consumerRights: ConsumerRight[] = [
    {
      id: '1',
      category: 'basic',
      title: 'Right to Safety',
      description: 'The right to be protected against marketing of goods and services which are hazardous to life and property.',
      details: [
        'Protection against products that are hazardous to life and health',
        'Products should meet mandatory safety standards',
        'Service providers must ensure safety in delivery of services',
        'Right to information about potential hazards'
      ],
      legalReferences: ['Section 2(9) of Consumer Protection Act, 2019', 'BIS Act, 2016'],
      caseStudies: [
        {
          title: 'Gas Cylinder Explosion Case',
          summary: 'A consumer was awarded compensation after a defective LPG cylinder caused property damage. The distributor was held liable for providing an unsafe product.'
        }
      ]
    },
    {
      id: '2',
      category: 'basic',
      title: 'Right to Information',
      description: 'The right to be informed about the quality, quantity, potency, purity, standard and price of goods or services to protect against unfair trade practices.',
      details: [
        'Clear disclosure of product specifications, ingredients, and usage instructions',
        'Transparent pricing including taxes and additional charges',
        'Information about potential side effects or risks',
        'Accurate representation in advertisements',
        'Information about after-sales service and warranty terms'
      ],
      legalReferences: ['Section 2(9) of Consumer Protection Act, 2019', 'Legal Metrology Act, 2009'],
      caseStudies: [
        {
          title: 'Misleading Advertisement Case',
          summary: 'A prominent fitness equipment company was penalized for false claims about weight loss results in their advertisements.'
        }
      ]
    },
    {
      id: '3',
      category: 'basic',
      title: 'Right to Choose',
      description: 'The right to be assured, wherever possible, access to a variety of goods and services at competitive prices.',
      details: [
        'Freedom to select from multiple options without coercion',
        'Protection against exclusive dealing arrangements',
        'No bundling of products without consent',
        'Right to comparison shop without penalty',
        'Protection against monopolistic pricing'
      ],
      legalReferences: ['Section 2(9) of Consumer Protection Act, 2019', 'Competition Act, 2002'],
      caseStudies: [
        {
          title: 'Cable TV Service Provider Case',
          summary: 'A cable operator was directed to offer channels on an à la carte basis rather than in mandatory bundles only.'
        }
      ]
    },
    {
      id: '4',
      category: 'basic',
      title: 'Right to be Heard',
      description: 'The right to be heard and to be assured that consumer interests will receive due consideration at appropriate forums.',
      details: [
        'Access to consumer dispute resolution bodies',
        'Right to file complaints and seek redressal',
        'Representation in consumer protection policy-making',
        'Consumer feedback mechanisms by businesses',
        'Protection against retribution for raising concerns'
      ],
      legalReferences: ['Section 2(9) of Consumer Protection Act, 2019', 'Consumer Protection Rules, 2020'],
      caseStudies: [
        {
          title: 'Airline Refund Policy Case',
          summary: 'A consumer forum directed an airline to change its refund policy after multiple complaints about excessive cancellation charges.'
        }
      ]
    },
    {
      id: '5',
      category: 'basic',
      title: 'Right to Seek Redressal',
      description: 'The right to seek redressal against unfair trade practices or unscrupulous exploitation.',
      details: [
        'Access to consumer courts and forums',
        'Right to compensation for damages',
        'Option of class action lawsuits',
        'Alternative dispute resolution mechanisms',
        'Enforcement of judgments against businesses'
      ],
      legalReferences: ['Chapter V of Consumer Protection Act, 2019', 'Consumer Protection Rules, 2020'],
      caseStudies: [
        {
          title: 'Mobile Phone Manufacturing Defect',
          summary: 'A consumer was awarded full refund and compensation when a manufacturer refused to acknowledge a manufacturing defect in a mobile phone.'
        }
      ]
    },
    {
      id: '6',
      category: 'basic',
      title: 'Right to Consumer Education',
      description: 'The right to acquire knowledge and skills to be an informed consumer throughout life.',
      details: [
        'Access to information about consumer rights',
        'Educational programs about consumer protection',
        'Awareness campaigns by government agencies',
        'Information about unfair practices and how to avoid them',
        'Knowledge about complaint mechanisms'
      ],
      legalReferences: ['Section 2(9) of Consumer Protection Act, 2019', 'Functions of Central Consumer Protection Authority'],
      caseStudies: [
        {
          title: 'Digital Literacy Initiative',
          summary: 'The government mandated e-commerce platforms to provide simplified information about return policies and digital rights.'
        }
      ]
    },
    {
      id: '7',
      category: 'ecommerce',
      title: 'Right to Return in Online Shopping',
      description: 'Rights related to returning products purchased through e-commerce platforms.',
      details: [
        'Minimum 7-day return period for most products',
        'Clear return policies must be disclosed before purchase',
        'Refund timelines and procedures must be followed',
        'Protection against misleading images or descriptions',
        'Rights regarding damaged or incorrect deliveries'
      ],
      legalReferences: ['E-Commerce Rules under Consumer Protection Act, 2020', 'Information Technology Act, 2000'],
      caseStudies: [
        {
          title: 'Online Furniture Purchase Case',
          summary: 'An e-commerce platform was directed to accept a return and provide full refund when a sofa delivered was significantly different from its online depiction.'
        }
      ]
    },
    {
      id: '8',
      category: 'products',
      title: 'Rights Regarding Product Warranties',
      description: 'Consumer rights related to product warranties and guarantees.',
      details: [
        'Warranty terms must be clear and accessible',
        'Implied warranties exist even when not explicitly stated',
        'Rights to repair, replacement, or refund for defective products',
        'Protection against void warranty claims for third-party repairs',
        'Extended warranty disclosure requirements'
      ],
      legalReferences: ['Sale of Goods Act, 1930', 'Consumer Protection Act, 2019'],
      caseStudies: [
        {
          title: 'Automobile Warranty Case',
          summary: 'A car manufacturer was ordered to honor warranty claims despite third-party servicing which did not affect the defective component.'
        }
      ]
    },
    {
      id: '9',
      category: 'services',
      title: 'Rights in Service Contracts',
      description: 'Rights when engaging with service providers like telecom, insurance, banking, etc.',
      details: [
        'Clear disclosure of service terms and conditions',
        'No unilateral changes to agreement terms',
        'Right to terminate services without unreasonable penalties',
        'Transparent billing practices',
        'Service quality standards and remedies for failures'
      ],
      legalReferences: ['Consumer Protection Act, 2019', 'Sector-specific regulations (TRAI, IRDAI, RBI guidelines)'],
      caseStudies: [
        {
          title: 'Telecom Service Quality Case',
          summary: 'A telecom provider was directed to compensate consumers for persistent call drops and poor service quality contrary to promised standards.'
        }
      ]
    },
    {
      id: '10',
      category: 'legal',
      title: 'Rights to Compensation',
      description: 'Rights to seek monetary compensation for damages caused by products or services.',
      details: [
        'Compensation for physical injury or property damage',
        'Recovery of financial losses due to defective products/services',
        'Compensation for mental agony in serious cases',
        'Punitive damages for intentional misconduct',
        'Class action settlements for widespread issues'
      ],
      legalReferences: ['Chapter VI of Consumer Protection Act, 2019', 'Tort Law principles'],
      caseStudies: [
        {
          title: 'Medical Negligence Case',
          summary: 'A hospital was ordered to pay substantial compensation for a surgical error that resulted in permanent disability to a patient.'
        }
      ]
    }
  ];
