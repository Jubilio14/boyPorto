import posPreview from '../assets/images/projects/point-of-sale-card.png'

export interface Project {
  id: number
  slug: string
  title: string
  tags: string[]
  description: string
  image: string
  imageAlt: string
  background: string
  isDummy?: boolean
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'point-of-sale-system',
    title: 'Point of Sale System',
    tags: ['Personal Product Project', 'UI/UX Design'],
    description:
      'A modern Point of Sale system redesigned to simplify retail operations, improve transaction workflows, and create a more intuitive cashier experience.',
    image: posPreview,
    imageAlt: 'Point of Sale System dashboard preview',
    background:
      'radial-gradient(circle at 82% 45%, rgba(193, 32, 58, 0.38), transparent 42%), #1d1d1d',
  },
  {
    id: 2,
    slug: 'tradeasia-design-system',
    title: 'Tradeasia Design System',
    tags: ['Professional Work'],
    description:
      'Contributed to the development of a scalable design system that improved consistency, streamlined collaboration, and supported multiple B2B websites across the Tradeasia ecosystem.',
    image: posPreview,
    imageAlt: 'Tradeasia Design System preview',
    background:
      'radial-gradient(circle at 82% 45%, rgba(18, 60, 105, 0.42), transparent 44%), #1d1d1d',
  },
  {
    id: 3,
    slug: 'tradeasia-design-system-dummy',
    title: 'Tradeasia Design System',
    tags: ['Professional Work'],
    description:
      'Contributed to the development of a scalable design system that improved consistency, streamlined collaboration, and supported multiple B2B websites across the Tradeasia ecosystem.',
    image: posPreview,
    imageAlt: 'Tradeasia Design System project preview',
    background:
      'radial-gradient(circle at 82% 45%, rgba(18, 60, 105, 0.42), transparent 44%), #1d1d1d',
    isDummy: true,
  },
]