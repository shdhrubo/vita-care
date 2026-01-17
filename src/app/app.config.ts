import { ApplicationConfig, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(() => {
      const iconRegistry = inject(MatIconRegistry);
      const sanitizer = inject(DomSanitizer);

      iconRegistry.addSvgIconSetInNamespace(
        'platform_solid',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/platform-solid.svg')
      );
    }),
  ],
};
