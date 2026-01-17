import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-banner-section',
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './banner-section.html',
  styleUrl: './banner-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerSection {}
