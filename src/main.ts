import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { mergeApplicationConfig } from '@angular/core';
import { environment } from './environments/environment';
import { provideAuth0 } from '@auth0/auth0-angular';

const auth0Config = mergeApplicationConfig(appConfig, {
  providers: [
    provideAuth0({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
      cacheLocation: 'localstorage',
    }),
  ],
});

bootstrapApplication(App, auth0Config).catch((err) => console.error(err));
