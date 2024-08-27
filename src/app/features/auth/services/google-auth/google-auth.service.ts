import { Injectable, inject } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  oAuthService = inject(OAuthService);
  constructor() {
    this.initConfiguration();
  }

  initConfiguration() {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: environment.googleClientIdOauth,
      redirectUri: window.location.origin + '/dashboard',
      scope: 'email',
      responseType: 'id_token token',
    };

    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocument();
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }
}
