import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center p-8 gap-4">
      <div class="relative w-12 h-12">
        <div class="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
        <div class="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      @if (message) {
        <p class="text-sm font-medium text-muted-foreground animate-pulse">{{ message }}</p>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class LoadingComponent {
  @Input() message: string = 'Loading doctors...';
}
