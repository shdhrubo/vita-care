import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CareService } from '../../../../core/services/care-service.service';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.scss',
})
export class ServiceDetail {
  private route = inject(ActivatedRoute);
  private careService = inject(CareService);

  private params = toSignal(this.route.paramMap);
  
  category = computed(() => {
    const id = this.params()?.get('id');
    const cats = this.careService.getCategories()();
    return cats.find(c => c.Id === id);
  });
}
