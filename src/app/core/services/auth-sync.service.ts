import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from './user.service';
import { filter, switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthSyncService {
  private auth = inject(AuthService);
  private userService = inject(UserService);
  private document = inject(DOCUMENT);

  syncUserOnLogin(): void {
    // Execute auth state sync checks every time application initializes and loads Auth0 context
    this.auth.isLoading$
      .pipe(
        filter((loading) => !loading),
        switchMap(() => this.auth.isAuthenticated$),
      )
      .subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          this.userService.setCurrentUser(null);
          return;
        }

        this.auth.user$
          .pipe(
            filter((user): user is NonNullable<typeof user> => !!user),
            take(1),
            switchMap((user) =>
              this.userService.upsertUser({
                Email: user.email ?? '',
                Name: user.name ?? '',
              }),
            ),
          )
          .subscribe({
            next: (dbUser) => {
              this.userService.setCurrentUser(dbUser);
            },
            error: (err) => {
              console.error('Failed to sync/authorize user profile with database:', err);
              // Auto logout fallback when standard authorization API blocks or errors.
              this.auth.logout({ logoutParams: { returnTo: this.document.location.origin } });
            },
          });
      });
  }
}
