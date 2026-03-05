import { Injectable, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from './user.service';
import { filter, switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthSyncService {
  private auth = inject(AuthService);
  private userService = inject(UserService);

  syncUserOnLogin(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const isFreshLogin = urlParams.has('code') && urlParams.has('state');

    if (!isFreshLogin) {
      return;
    }

    this.auth.isLoading$
      .pipe(
        filter((loading) => !loading),
        take(1),
        switchMap(() => this.auth.user$),
        filter((user): user is NonNullable<typeof user> => !!user),
        take(1),
        switchMap((user) =>
          this.userService.upsertUser({
            Email: user.email ?? '',
            Name: user.name ?? '',
          }),
        ),
      )
      .subscribe();
  }
}
