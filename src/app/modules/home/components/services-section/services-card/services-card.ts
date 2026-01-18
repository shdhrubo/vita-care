import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Service } from '../services-section';

@Component({
  selector: 'app-services-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './services-card.html',
  styleUrl: './services-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesCard {
  @Input({ required: true }) item!: Service;
  @Input({ required: true }) $index!: number;
}
