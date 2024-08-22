import { Injectable, inject } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _messaging = inject(Messaging);
  private api = inject(ApiService);

  async getDeviceToken() {
    try {
      const token: string = await getToken(this._messaging, {
        vapidKey: environment.vapidKey,
      });

      return token;
    } catch (error) {
      console.log('Token error', error);
      return null;
    }
  }

  async saveFcmToken() {
    const token = await this.getDeviceToken();
    if (token) {
      console.log(token);
      this.api
        .post(`notification/save-device-fcm-token`, {
          token: token,
        })
        .subscribe({
          next: () => {
            this.onMessage();
          },
        });
    }
  }

  onMessage(): void {
    onMessage(this._messaging, {
      next: (payload) => {
        console.log('Message', payload);
      },
      error: (error) => console.log('Message error', error),
      complete: () => console.log('Done listening to messages'),
    });
  }
}
