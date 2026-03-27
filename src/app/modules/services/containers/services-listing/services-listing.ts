import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CareService } from '../../../../core/services/care-service.service';
import { MatIconModule } from '@angular/material/icon';
import { ServiceHero } from '../../components/service-hero/service-hero';
import { ServiceCategoryCard } from '../../components/service-category-card/service-category-card';

@Component({
  selector: 'app-services-listing',
  standalone: true,
  imports: [CommonModule, MatIconModule, ServiceHero, ServiceCategoryCard],
  templateUrl: './services-listing.html',
  styleUrl: './services-listing.scss',
})
export class ServicesListing {
  private careService = inject(CareService);
  private router = inject(Router);

  categories = this.careService.getCategories();

  onCategoryClick(categoryId: string) {
    if (categoryId) {
      this.router.navigate(['/services', categoryId]);
    }
  }
}
