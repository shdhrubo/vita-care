import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-about-values',
  standalone: true,
  templateUrl: './about-values.html',
  styleUrl: './about-values.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutValuesComponent {
  @Input() values: { title: string; desc: string }[] = [];
}
