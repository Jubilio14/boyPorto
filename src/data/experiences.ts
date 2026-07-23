export interface Experience {
  id: number
  period: string
  role: string
  company: string
  location: string
  responsibilities: string[]
  datePosition: 'top' | 'bottom'

  // Nanti diisi URL hasil import gambar.
  logo?: string

  // Warna placeholder selama logo belum tersedia.
  logoColor: string

  // Untuk alt text ketika sudah memakai gambar.
  logoAlt: string

  isCurrent?: boolean
}

export const experiences: Experience[] = [
  {
    id: 1,
    period: "Jul '25 – Jul '26",
    role: 'UI/UX Designer',
    company: 'Shil Studio',
    location: 'Remote, Australia',
    datePosition: 'top',
    isCurrent: true,

    logoColor: '#D9D9D9',
    logoAlt: 'Shil Studio logo',

    responsibilities: [
      'This POS system was redesigned from the ground up to replace manual store operations with a structured, data-driven system that actually works for the people using it.',

      'This POS system was redesigned from the ground up to replace manual store operations with a structured, data-driven system that actually works for the people using it.',

      'This POS system was redesigned from the ground up to replace manual store operations with a structured, data-driven system that actually works for the people using it.',
    ],
  },
  {
    id: 2,
    period: "Jul '25 – Jul '26",
    role: 'UI/UX Designer',
    company: 'Shil Studio',
    location: 'Remote, Australia',
    datePosition: 'bottom',

    logoColor: '#D9D9D9',
    logoAlt: 'Shil Studio logo',

    responsibilities: [
      'This POS system was redesigned from the ground up to replace manual store operations with a structured, data-driven system that actually works for the people using it.',

      'This POS system was redesigned from the ground up to replace manual store operations with a structured, data-driven system that actually works for the people using it.',

      'This POS system was redesigned from the ground up to replace manual store operations with a structured, data-driven system that actually works for the people using it.',
    ],
  },
  {
    id: 3,
    period: "Jul '25 – Jul '26",
    role: 'UI/UX Designer',
    company: 'Shil Studio',
    location: 'Remote, Australia',
    datePosition: 'top',

    logoColor: '#D9D9D9',
    logoAlt: 'Shil Studio logo',

    responsibilities: [
      'This POS system was redesigned from the ground up to replace manual store operations with a structured, data-driven system that actually works for the people using it.',

      'This POS system was redesigned from the ground up to replace manual store operations with a structured, data-driven system that actually works for the people using it.',

      'This POS system was redesigned from the ground up to replace manual store operations with a structured, data-driven system that actually works for the people using it.',
    ],
  },
  {
    id: 4,
    period: "Jul '25 – Jul '26",
    role: 'UI/UX Designer',
    company: 'Shil Studio',
    location: 'Remote, Australia',
    datePosition: 'bottom',

    logoColor: '#D9D9D9',
    logoAlt: 'Shil Studio logo',

    responsibilities: [
      'This POS system was redesigned from the ground up to replace manual store operations with a structured, data-driven system that actually works for the people using it.',

      'This POS system was redesigned from the ground up to replace manual store operations with a structured, data-driven system that actually works for the people using it.',

      'This POS system was redesigned from the ground up to replace manual store operations with a structured, data-driven system that actually works for the people using it.',
    ],
  },
]