import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { TestimonialCard } from './testimonial-card/testimonial-card';

export interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

@Component({
  selector: 'app-testimonial-section',
  standalone: true,
  imports: [CommonModule, MatIconModule, TestimonialCard],
  templateUrl: './testimonial-section.html',
  styleUrl: './testimonial-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialSection {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;

  testimonials: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      image: 'assets/images/avatar-1.png',
      quote:
        'Finding a specialist was always a hassle until I found VitaCare. The instant booking feature saved me so much time. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Business Owner',
      image: 'assets/images/avatar-2.png',
      quote:
        'The video consultation feature is a game-changer for my busy schedule. Dr. Smith was incredibly professional and attentive.',
      rating: 5,
    },
    {
      name: 'Emma Davis',
      role: 'Graduate Student',
      image: 'assets/images/avatar-3.png',
      quote:
        'As a student, affordable and accessible healthcare is vital. VitaCare made it easy to find a doctor within my budget.',
      rating: 5,
    },
    {
      name: 'David Wilson',
      role: 'Software Engineer',
      image: 'assets/images/avatar-2.png',
      quote:
        'The platform is intuitive and user-friendly. I appreciate the reminders and digital prescriptions. Excellent service overall.',
      rating: 4,
    },
    {
      name: 'Olivia Brown',
      role: 'Teacher',
      image: 'assets/images/avatar-1.png',
      quote:
        'I booked an appointment for my son in minutes. The pediatrician was wonderful. Thank you VitaCare for making it stress-free.',
      rating: 5,
    },
  ];

  scroll(direction: 'left' | 'right') {
    if (!this.scrollContainer) return;

    const container = this.scrollContainer.nativeElement;
    const itemWidth = container.firstElementChild?.getBoundingClientRect().width || 300;
    const scrollAmount = direction === 'left' ? -itemWidth : itemWidth;

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }
}
