import { Injectable, inject } from '@angular/core';
import { Messaging, getToken } from '@angular/fire/messaging';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _messaging = inject(Messaging);
  private api = inject(ApiService);

  swRegistration?: ServiceWorkerRegistration;

  // Obtiene el token del dispositivo
  async getDeviceToken() {
    try {
      const token: string = await getToken(this._messaging, {
        vapidKey: environment.vapidKey,
        serviceWorkerRegistration: this.swRegistration,
      });

      return token;
    } catch (error) {
      console.error('Token error', error);
      return null;
    }
  }

  // Registra el token del dispositivo
  async saveFcmToken() {
    await this.registerServiceWorker();
    const token = await this.getDeviceToken();
    console.log('Token', token);
    if (token) {
      this.api
        .post(`notification/save-device-fcm-token`, {
          token: token,
        })
        .subscribe();
    }
  }

  // Registra el service worker
  async registerServiceWorker() {
    this.swRegistration = await navigator.serviceWorker.register(
      'firebase-messaging-sw.js'
    );

    // Wait for serviceWorker.ready
    await navigator.serviceWorker.ready;
  }
}
