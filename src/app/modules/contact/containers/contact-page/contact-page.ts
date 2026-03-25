import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ContactIntroComponent } from '../../components/contact-intro/contact-intro';
import { ContactDetailsComponent } from '../../components/contact-details/contact-details';
import { ContactFormComponent } from '../../components/contact-form/contact-form';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ContactIntroComponent, ContactDetailsComponent, ContactFormComponent],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  contactDetails = [
    {
      label: 'Main Office',
      value: '12 Medical Plaza, Innovation Drive',
      subValue: 'Central District, Vita City',
      icon: 'platform_solid:map-pin',
    },
    {
      label: 'Phone Support',
      value: '+1 (555) 900-VITA',
      subValue: 'Mon - Sun, 24/7 Response',
      icon: 'platform_solid:phone',
    },
    {
      label: 'Email Queries',
      value: 'care@vitacare.com',
      subValue: 'Fast response within 24h',
      icon: 'platform_solid:mail',
    },
  ];

  isSubmitting = false;

  submitMessage() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      // Simulated submission
      setTimeout(() => {
        this.toastr.success(
          'Your message has been received. Our team will contact you shortly.',
          'Message Sent',
        );
        this.contactForm.reset();
        this.isSubmitting = false;
      }, 1500);
    } else {
      this.toastr.warning('Please complete the form correctly.', 'Form Incomplete');
    }
  }
}
