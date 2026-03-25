import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-contact-intro',
  standalone: true,
  templateUrl: './contact-intro.html',
  styleUrl: './contact-intro.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactIntroComponent {}
