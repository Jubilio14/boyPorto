import ovoVisualRedesign from '../assets/images/project-details/ovo-redesign/visual-redesign.webp'
import ovoFinancialOverview from '../assets/images/project-details/ovo-redesign/financial-overview.webp'

export interface ProjectDetail {
  slug: string
  badge: string
  title: string
  summary: string
  role: string
  platform: string
  year: string
  heroMediaType?: 'gif' | 'image' | 'placeholder'
  heroMedia?: string

  context?: ProjectContext
  userVoices?: UserVoices
  visualRedesign?: ProjectVisualRedesign
  financialManagement?: FinancialManagementSection
  splitBill?: SplitBillSection
  usabilityTesting?: UsabilityTestingSection
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: 'ovo-redesign',
    badge: 'Case Study',
    title: 'OVO Redesign',
    summary:
      'A conceptual redesign completed as the final project of the Hacktiv8 UI/UX Design Bootcamp. This project focused on improving user acquisition and increasing order rates through user research, usability testing, and interface redesign.',
    role: 'UI/UX Student',
    platform: 'Mobile',
    year: '2024',
    heroMediaType: 'placeholder',

    context: {
      eyebrow: 'Context',
      title: 'Why improving OVO mattered',

      paragraphs: [
        `OVO has become one of Indonesia's most widely used digital wallets, but conversations with potential users revealed that adoption wasn't only influenced by available features. The overall experience also played a significant role in how people perceived the product.`,

        `Throughout the research, three themes appeared consistently: the interface felt visually less engaging than competing apps, users expected better tools to manage their finances, and splitting shared expenses still required using other applications. These insights became the foundation for exploring how OVO could provide a more complete everyday financial experience.`,
      ],

      cards: [
        {
          title: 'The interface felt outdated',
          description:
            'Several participants described the interface as less modern and visually engaging compared to other digital wallet apps they regularly used.',
        },
        {
          title: 'Limited financial management',
          description:
            'Users wanted simple ways to understand where their money went instead of only seeing a transaction history.',
        },
        {
          title: 'Paying together was unnecessarily manual',
          description:
            'When someone paid first during group activities, participants still relied on messaging apps or manual calculations to split expenses.',
        },
      ],
    },
    userVoices: {
      title: `In users' own words...`,

      description: `The redesign wasn't driven by assumptions alone. During user interviews, several participants repeatedly pointed to similar frustrations when using digital wallet apps. While the original interview transcripts are no longer available, the insights below summarize the recurring themes that guided the redesign.`,

      disclaimer:
        'Adapted from real customer support tickets. Personal information has been modified.',

      quotes: [
        {
          quote:
            'When eating out with friends, splitting expenses is always manual.',
          persona: 'University Student',
          name: 'Silio',
        },
        {
          quote: `I want to know where my money goes, not just see a list of transactions.`,
          persona: 'Young Professional',
          name: 'Fransesco',
        },
        {
          quote:
            'Nothing really stands out that makes me choose OVO over other options.',
          persona: 'Frequent Digital Wallet User',
          name: 'Ridhoni',
        },
      ],
    },

    visualRedesign: {
      eyebrow: 'Visual Redesign',
      title: 'A modern experience from the first interaction',
      description:
        'The redesign introduces a cleaner and more consistent visual language across the product. Beyond refreshing the interface, the experience was reorganized with a clearer information hierarchy, more accessible primary actions, and better content grouping to reduce visual clutter. The home screen below represents how these design principles are consistently applied throughout the redesigned OVO experience.',
      image: ovoVisualRedesign,
      imageAlt:
        'OVO mobile application visual redesign showing the home screen, financial overview, navigation, and split bill feature.',
    },

    financialManagement: {
      eyebrow: 'Financial Management',
      title: 'Understand your finances at a glance',

      description:
        'The redesigned dashboard gives users a clear overview of their financial activity without requiring them to navigate through multiple screens. Income, expenses, and spending trends are presented in a simple visual format, making it easier to monitor financial health and identify changes over time.',

      visuals: [
        {
          image: ovoFinancialOverview,
          imageAlt:
            'OVO financial overview dashboard showing balance, income, expenses, and spending categories.',
          caption:
            'Balance, income, expenses, and spending categories are organized into a single overview for faster financial tracking.',
        },
        {
          imageAlt: 'OVO spending trends and transaction history interface.',
          caption:
            'Spending trends and transaction history are presented together, giving users immediate context for every expense category.',
        },
      ],
    },
    splitBill: {
      eyebrow: 'New Feature',
      title: 'Splitting expenses without the hassle',

      description:
        'One opportunity identified during research was the absence of a dedicated Split Bill feature. The proposed solution introduces a structured workflow that makes shared expenses easier to create, manage, and track.',

      steps: [
        {
          imageAlt:
            'Options for scanning a receipt or creating a split bill manually.',
          description:
            'Users can choose between scanning a receipt or creating a bill manually, allowing the experience to adapt to different situations and preferences.',
        },
        {
          imageAlt: 'OVO automatically capturing information from a receipt.',
          description:
            'Receipt details are captured automatically, reducing repetitive manual input while keeping the process fast and accurate.',
        },
        {
          imageAlt: 'Receipt information review screen before continuing.',
          description:
            'Captured receipt information is reviewed before continuing, giving users a chance to verify and correct details before sharing expenses.',
        },
        {
          imageAlt:
            'Editable receipt item details in the OVO split bill workflow.',
          description:
            'Every receipt detail remains editable, allowing users to quickly correct item names, quantities, taxes, or prices whenever needed.',
        },
        {
          imageAlt:
            'Participant selection screen for splitting shared expenses.',
          description:
            'Participants are selected before assigning expenses, creating a clear and predictable starting point for the splitting process.',
        },
        {
          imageAlt:
            'Expense assignment screen for each split bill participant.',
          description: `Expenses are assigned from each participant's perspective, reflecting how people naturally remember what they ordered instead of thinking item by item.`,
        },
        {
          imageAlt:
            'Final split bill breakdown before sending payment requests.',
          description:
            'Before sending payment requests, users can review the final breakdown to ensure every participant receives the correct amount.',
        },
        {
          imageAlt:
            'Payment request sharing screen for split bill participants.',
          description:
            'Once the bill is created, users are guided to share the payment request and begin collecting payments from participants.',
        },
        {
          imageAlt: 'Payment progress tracking for an active OVO split bill.',
          description:
            'Payment progress is tracked in one place, while allowing automatic confirmation for supported payments and manual updates when needed.',
        },
      ],
    },
    usabilityTesting: {
      eyebrow: 'Usability Testing',
      title: 'Validating the redesigned experience',

      description:
        'To evaluate the redesigned experience, I conducted usability testing with representative users. The sessions measured task completion across the key workflows introduced in this redesign, helping identify usability issues before implementation.',

      metrics: [
        {
          value: '93%',
          label: 'Average Task Success Rate',
        },
        {
          value: '5',
          label: 'Participants',
        },
        {
          value: '3',
          label: 'Task Scenarios',
        },
      ],

      scenarioResults: [
        {
          value: '100%',
          label: 'Receipt Scan Split Bill',
        },
        {
          value: '86%',
          label: 'Manual Split Bill',
        },
        {
          value: '93%',
          label: 'Find Spending Insights',
        },
      ],
    },
  },
]

export interface ContextCard {
  title: string
  description: string
}

export interface ProjectContext {
  eyebrow: string
  title: string
  paragraphs: string[]
  cards: ContextCard[]
}

export interface UserQuote {
  quote: string
  persona: string
  name: string
}

export interface UserVoices {
  title: string
  description: string
  disclaimer: string
  quotes: UserQuote[]
}

export interface ProjectVisualRedesign {
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
}

export interface FinancialManagementVisual {
  image?: string
  imageAlt: string
  caption: string
}

export interface FinancialManagementSection {
  eyebrow: string
  title: string
  description: string
  visuals: FinancialManagementVisual[]
}

export interface SplitBillStep {
  image?: string
  imageAlt: string
  description: string
}

export interface SplitBillSection {
  eyebrow: string
  title: string
  description: string
  steps: SplitBillStep[]
}

export interface UsabilityMetric {
  value: string
  label: string
}

export interface UsabilityScenarioResult {
  value: string
  label: string
}

export interface UsabilityTestingSection {
  eyebrow: string
  title: string
  description: string
  metrics: UsabilityMetric[]
  scenarioResults: UsabilityScenarioResult[]
}
