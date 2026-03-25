import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDetailsComponent {
  @Input() details: { label: string; value: string; subValue: string; icon: string }[] = [];
}
