import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FaqItem } from '../../contracts/home-page.contracts';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqSection {
  faqs: FaqItem[] = [
    {
      question: 'How do I book an appointment?',
      answer:
        'You can book an appointment easily through our website. Simply search for a doctor by specialty or name, check their available slots, and click "Book Now". You will receive an instant confirmation.',
      isOpen: true,
    },
    {
      question: 'Can I cancel or reschedule my appointment?',
      answer:
        'Yes, you can manage your appointments from your dashboard. Cancellations are free up to 24 hours before the scheduled time. Rescheduling follows the same availability rules.',
      isOpen: false,
    },
    {
      question: 'Do you offer online video consultations?',
      answer:
        "Absolutely. Many of our specialists offer secure video consultations. Look for the video icon next to the doctor's profile to see if they provide telemedicine services.",
      isOpen: false,
    },
    {
      question: 'Is my medical data secure?',
      answer:
        'Your privacy is our top priority. We use bank-grade encryption and comply with all healthcare data protection regulations (HIPAA/GDPR) to ensure your personal and medical information remains confidential.',
      isOpen: false,
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, debit cards, and digital wallets. Payment is typically required to confirm your booking, though some clinics allow payment on arrival.',
      isOpen: false,
    },
  ];

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
