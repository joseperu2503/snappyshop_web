import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  InMemoryScrollingOptions,
  provideRouter,
  withComponentInputBinding,
  InMemoryScrollingFeature,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { tokenInterceptor } from './core/interceptors/token/token.interceptor';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { environment } from '../environments/environment';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};
const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      inMemoryScrollingFeature
    ),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimationsAsync(),
    provideAngularSvgIcon(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideMessaging(() => getMessaging()),
  ],
};
