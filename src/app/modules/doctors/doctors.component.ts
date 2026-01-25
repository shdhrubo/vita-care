import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorsComponent {}
