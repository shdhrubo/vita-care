import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-about-header',
  standalone: true,
  templateUrl: './about-header.html',
  styleUrl: './about-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutHeaderComponent {}
