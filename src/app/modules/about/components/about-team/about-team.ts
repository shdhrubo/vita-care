import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-about-team',
  standalone: true,
  templateUrl: './about-team.html',
  styleUrl: './about-team.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutTeamComponent {
  @Input() team: { name: string; role: string; image: string; specialty: string }[] = [];
}
