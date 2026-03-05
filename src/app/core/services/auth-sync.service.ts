import { Injectable, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from './user.service';
import { filter, switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthSyncService {
  private auth = inject(AuthService);
  private userService = inject(UserService);

  /**
   * Call this once during app initialization.
   * It waits for Auth0 to finish loading, then — if the user
   * is authenticated — upserts their profile in the backend.
   */
  syncUserOnLogin(): void {
    this.auth.isLoading$
      .pipe(
        // Wait until Auth0 has finished its initialization
        filter((loading) => !loading),
        take(1),
        switchMap(() => this.auth.user$),
        filter((user): user is NonNullable<typeof user> => !!user),
        take(1),
        switchMap((user) =>
          this.userService.upsertUser({
            Email: user.email ?? '',
            Name: user.name ?? '',
          })
        )
      )
      .subscribe({
        next: () => console.log('[AuthSync] User synced with backend.'),
        error: (err) => console.error('[AuthSync] Failed to sync user:', err),
      });
  }
}
