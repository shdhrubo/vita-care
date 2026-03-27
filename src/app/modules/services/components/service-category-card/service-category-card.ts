import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ServiceCategory } from '../../../../core/contracts/service.contracts';

@Component({
  selector: 'app-service-category-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './service-category-card.html',
  styleUrl: './service-category-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCategoryCard {
  @Input({ required: true }) category!: ServiceCategory;
  @Input() isActive = false;
  @Output() cardClick = new EventEmitter<string>();

  onClick() {
    this.cardClick.emit(this.category.Id);
  }
}
