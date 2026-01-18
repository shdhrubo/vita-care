import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mobile-app-section',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './mobile-app-section.html',
  styleUrl: './mobile-app-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileAppSection {
  features = [
    'Book appointments on the go',
    'Access medical records anytime',
    'Get real-time queue updates',
    'Receive instant notifications',
    'Video consultations',
    'Digital prescriptions',
  ];
}
