import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about-metrics',
  standalone: true,
  templateUrl: './about-metrics.html',
  styleUrl: './about-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMetricsComponent {}
