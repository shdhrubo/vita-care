import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stat {
  value: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-section.html',
  styleUrl: './stats-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsSection {
  stats: Stat[] = [
    {
      value: '15,000+',
      label: 'Happy Patients',
      description: 'Trusted by families',
    },
    {
      value: '50+',
      label: 'Expert Doctors',
      description: 'Across all specialties',
    },
    {
      value: '98%',
      label: 'Success Rate',
      description: 'Patient satisfaction',
    },
    {
      value: '24/7',
      label: 'Available',
      description: 'Round the clock care',
    },
  ];
}
