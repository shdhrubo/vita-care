import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './about-section.html',
  styleUrl: './about-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSection {
  features = [
    'Searchable Directory',
    'Detailed provider profiles',
    'Appointment scheduling',
    'Online consultations',
    'Patient resources',
  ];
}
