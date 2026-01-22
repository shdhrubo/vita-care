import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Partner } from '../../contracts/home-page.contracts';

@Component({
  selector: 'app-partners-section',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './partners-section.html',
  styleUrl: './partners-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnersSection {
  partners: Partner[] = [
    { name: 'HealthGrid', icon: 'platform_solid:activity' },
    { name: 'MediCare', icon: 'platform_solid:stethoscope' },
    { name: 'BioLab', icon: 'platform_solid:flask' },
    { name: 'AstraClinic', icon: 'platform_solid:bone' },
    { name: 'PulseMed', icon: 'platform_solid:activity' },
    { name: 'CareLogic', icon: 'platform_solid:users' },
    { name: 'Vitalize', icon: 'platform_solid:heart' },
    { name: 'HealthFirst', icon: 'platform_solid:activity' },
  ];

  // Tripled for perfectly seamless infinite movement
  logoBelt = [...this.partners, ...this.partners, ...this.partners];
}
