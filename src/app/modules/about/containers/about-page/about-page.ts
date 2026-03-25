import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutHeaderComponent } from '../../components/about-header/about-header';
import { AboutVisionComponent } from '../../components/about-vision/about-vision';
import { AboutMetricsComponent } from '../../components/about-metrics/about-metrics';
import { AboutValuesComponent } from '../../components/about-values/about-values';
import { AboutTeamComponent } from '../../components/about-team/about-team';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    CommonModule, 
    AboutHeaderComponent, 
    AboutVisionComponent, 
    AboutMetricsComponent, 
    AboutValuesComponent, 
    AboutTeamComponent
  ],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  team = [
    {
      name: 'Dr. Arthur Sterling',
      role: 'Chief Medical Officer',
      image: '/assets/images/team-doctor-1.png',
      specialty: 'Internal Medicine, 20+ Yrs Exp.',
    },
    {
      name: 'Dr. Elena Vance',
      role: 'Director of Surgery',
      image: '/assets/images/team-doctor-2.png',
      specialty: 'Orthopedic Surgery Specialist',
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Head of Diagnostics',
      image: '/assets/images/team-doctor-3.png',
      specialty: 'Advanced Radiology & MRI',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Operations Director',
      image: '/assets/images/team-manager.png',
      specialty: 'Healthcare Management Expert',
    },
  ];

  values = [
    {
      title: 'Elite Care',
      desc: 'Recruiting the top 1% of medical professionals globally to serve our community.',
    },
    {
      title: 'Tech First',
      desc: 'Utilizing neural diagnostics and high-fidelity patient telemetry for precision care.',
    },
    {
      title: 'Deep Trust',
      desc: 'Architecture built on medical confidentiality and data sovereignity.',
    },
  ];
}
