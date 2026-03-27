import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-hero.html',
  styleUrl: './service-hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceHero {}
