import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  @Input() form!: FormGroup;
  @Input() isSubmitting = false;
  @Output() onSubmit = new EventEmitter<void>();
}
