import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../core/services/user.service';
import { DbUser } from '../../core/contracts/user.contracts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private userService = inject(UserService);
  isAdmin$!: Observable<boolean>;
  
  ngOnInit() {
    this.isAdmin$ = this.userService.currentUser$.pipe(
      map((user: DbUser | null) => {
        if (!user || !user.Roles) return false;
        // Verify case-insensitive match for admin role
        return user.Roles.some((role: string) => role.toLowerCase() === 'admin');
      })
    );
  }
}
