export interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}
export interface Stat {
  value: string;
  label: string;
  description: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  link: string;
  image: string;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Partner {
  name: string;
  icon: string;
}
