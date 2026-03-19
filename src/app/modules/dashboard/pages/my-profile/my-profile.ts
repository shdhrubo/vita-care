import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyProfilePage {
  protected userService = inject(UserService);
  protected user$ = this.userService.currentUser$;
}
