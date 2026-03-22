import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { map, filter, take } from 'rxjs/operators';
import { DbUser } from '../contracts/user.contracts';

export const roleGuardFn = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const userService = inject(UserService);
    const router = inject(Router);

    return userService.currentUser$.pipe(
      // Wait for the user to be loaded from the backend if it's still null initially upon direct URL access
      filter((user) => user !== null),
      take(1),
      map((user: DbUser | null) => {
        if (!user || !user.Roles) {
          router.navigate(['/dashboard']);
          return false;
        }
        
        const hasRole = user.Roles.some((role: string) => 
          allowedRoles.includes(role.toLowerCase())
        );

        if (!hasRole) {
          router.navigate(['/dashboard']);
          return false;
        }

        return true;
      })
    );
  };
};
