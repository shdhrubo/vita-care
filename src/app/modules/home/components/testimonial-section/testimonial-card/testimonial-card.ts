import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Testimonial } from '../../../contracts/home-page.contracts';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './testimonial-card.html',
  styleUrl: './testimonial-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialCard {
  @Input({ required: true }) item!: Testimonial;
}
