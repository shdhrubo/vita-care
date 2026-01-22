import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesCard } from './services-card/services-card';
import { Service } from '../../contracts/home-page.contracts';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule, ServicesCard],
  templateUrl: './services-section.html',
  styleUrl: './services-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSection {
  services: Service[] = [
    {
      icon: 'platform_solid:stethoscope',
      title: 'General Checkup',
      description:
        'Comprehensive health screenings and preventive care to keep you and your family in optimal health year-round.',
      link: '/services/general',
      image: 'assets/images/service_general.png',
    },
    {
      icon: 'platform_solid:activity',
      title: 'Cardiology',
      description:
        'Advanced heart care specializing in diagnosis, treatment, and recovery for all cardiac conditions.',
      link: '/services/cardiology',
      image: 'assets/images/service_general.png',
    },
    {
      icon: 'platform_solid:ambulance',
      title: 'Emergency Care',
      description:
        '24/7 rapid response and emergency medical services equipped to handle critical life-saving situations.',
      link: '/services/emergency',
      image: 'assets/images/service_general.png',
    },
  ];
}
