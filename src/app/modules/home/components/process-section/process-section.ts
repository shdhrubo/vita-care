import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-process-section',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './process-section.html',
  styleUrl: './process-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessSection {
  steps: Step[] = [
    {
      id: '01',
      title: 'Search Specialist',
      description: 'Easily find the best doctors and specialists near your location.',
      icon: 'platform_solid:search',
    },
    {
      id: '02',
      title: 'Schedule Visit',
      description: 'Choose a convenient time slot and book your appointment instantly.',
      icon: 'platform_solid:calendar',
    },
    {
      id: '03',
      title: 'Get Treatment',
      description: 'Visit our clinic or have a virtual consultation with your doctor.',
      icon: 'platform_solid:stethoscope',
    },
    {
      id: '04',
      title: 'Healthy Life',
      description: 'Follow the prescribed plan and enjoy a better, healthier lifestyle.',
      icon: 'platform_solid:activity',
    },
  ];
}
