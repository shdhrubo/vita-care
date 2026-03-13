import { ApplicationConfig, provideAppInitializer, inject } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { routes } from './app.routes';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { AuthSyncService } from './core/services/auth-sync.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes, 
      withInMemoryScrolling({ 
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled' 
      })
    ),
    // Enable DI-based interceptors
    provideHttpClient(withInterceptorsFromDi()),
    // Register the API interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    provideAppInitializer(() => {
      const iconRegistry = inject(MatIconRegistry);
      const sanitizer = inject(DomSanitizer);

      iconRegistry.addSvgIconSetInNamespace(
        'platform_solid',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/platform-solid.svg'),
      );

      // Kick off user sync – runs once after Auth0 confirms the user
      const authSync = inject(AuthSyncService);
      authSync.syncUserOnLogin();
    }),
  ],
};

