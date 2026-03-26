import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from './user.service';
import { filter, switchMap, take, distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthSyncService {
  private auth = inject(AuthService);
  private userService = inject(UserService);
  private document = inject(DOCUMENT);

  syncUserOnLogin(): void {
    // Flattened stream with state protections to prevent duplicate calls
    this.auth.isLoading$
      .pipe(
        filter((loading) => !loading),
        switchMap(() => this.auth.isAuthenticated$),
        distinctUntilChanged(),
      )
      .subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          this.userService.setCurrentUser(null);
          return;
        }

        this.auth.user$
          .pipe(
            filter((user): user is NonNullable<typeof user> => !!user),
            distinctUntilChanged((prev, curr) => prev?.email === curr?.email),
            take(1),
            switchMap((user) =>
              this.userService.upsertUser({
                Email: user.email ?? '',
                Name: user.name ?? '',
              }),
            ),
          )
          .subscribe({
            next: (dbUser) => this.userService.setCurrentUser(dbUser),
            error: (err) => {
              console.error('Failed to sync/authorize user profile with database:', err);
              this.auth.logout({ logoutParams: { returnTo: this.document.location.origin } });
            },
          });
      });
  }
}
