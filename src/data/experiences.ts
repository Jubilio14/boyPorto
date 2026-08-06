import ravLogo from '../assets/images/experiences/ravLogo.png'
import bankSumut from '../assets/images/experiences/bankSumut.png'
import shilStudio from '../assets/images/experiences/shilStudio.png'
import tradeAsia from '../assets/images/experiences/tradeAsia.png'

export interface Experience {
  id: number
  period: string
  role: string
  company: string
  location: string
  responsibilities: string[]
  datePosition: 'top' | 'bottom'
  logo?: string
  logoBackground?: string
  isCurrent?: boolean
}

export const experiences: Experience[] = [
  {
    id: 1,
    period: "Jul '26 – Present",
    role: 'UI/UX Designer',
    company: 'Shil Studio',
    location: 'Remote, Australia',
    datePosition: 'top',
    isCurrent: true,

    logo: shilStudio,
    logoBackground: '#000000',

    responsibilities: [
      'Optimized existing Figma files by improving Auto Layout, component structure, and organization to create developer-friendly design files.',

      'Adapted desktop designs into responsive mobile layouts while maintaining visual consistency, usability, and design system standards.',
    ],
  },
  {
    id: 2,
    period: "Dec '24 – Present",
    role: 'UI/UX Designer',
    company: 'Freelance',
    location: 'Jakarta, Indonesia',
    datePosition: 'bottom',
    logo: ravLogo,
    logoBackground: '#ffffff',

    responsibilities: [
      'Delivered end-to-end UI/UX design for website and mobile projects, from discovery and research to high-fidelity design and handoff.',

      'Collaborated with business owners to translate goals into user-centered digital experiences through strategy, design, and implementation.',

      'Provided ongoing maintenance and design consultation, building long-term client relationships through repeat engagements and referrals.',
    ],
  },
  {
    id: 3,
    period: "Jul '25 – Jul '26",
    role: 'UI/UX Designer',
    company: 'Tradeasia International',
    location: 'Jakarta, Indonesia',
    datePosition: 'top',
    logo: tradeAsia,
    logoBackground: '#123C69',
    responsibilities: [
      'Established a centralized design system across 50+ websites, improving design consistency and collaboration between Design and Development teams.',

      'Conducted competitor benchmarking and business analysis to design features that improved user engagement and supported business objectives.',

      'Led UI/UX design for enterprise websites and performed design QA to ensure consistency, usability, and implementation quality.',
    ],
  },
  {
    id: 4,
    period: "Jul '22 – Aug '22",
    role: 'Web Designer',
    company: 'PT. Bank Sumut - Intern',
    location: 'Jakarta, Indonesia',
    datePosition: 'bottom',
    logo: bankSumut,
    logoBackground: '#FFFFFF',

    responsibilities: [
      'Contributed to the UI/UX design of a CSR website through user research, wireframing, prototyping, and usability testing.',

      'Collaborated with stakeholders to translate business requirements into intuitive and user-centered digital experiences.',

      'Strengthened foundational UI/UX skills by participating in the complete design process within a professional environment.',
    ],
  },
]
