import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { icon: 'platform_solid:facebook', url: '#' },
    { icon: 'platform_solid:instagram', url: '#' },
    { icon: 'platform_solid:linkedin', url: '#' },
  ];

  quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Contact', path: '/contact' },
  ];

  serviceLinks = [
    { label: 'General Consultation', path: '/services/consultation' },
    { label: 'Cardiology', path: '/services/cardiology' },
    { label: 'Pediatrics', path: '/services/pediatrics' },
    { label: 'Lab Testing', path: '/services/lab-test' },
    { label: 'Emergency Care', path: '/services/ambulance' },
  ];

  contactInfo = [
    {
      icon: 'platform_solid:map-pin',
      lines: ['123 Healthcare Ave,', 'Medical City, MC 12345'],
    },
    {
      icon: 'platform_solid:phone',
      text: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: 'platform_solid:mail',
      text: 'info@vitacare.com',
      href: 'mailto:info@vitacare.com',
    },
  ];
}
