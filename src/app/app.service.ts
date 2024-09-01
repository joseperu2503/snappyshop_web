import { Injectable, inject, signal } from '@angular/core';
import { UserService } from './features/user/services/user.service';
import { CartStore } from './features/cart/stores/cart.store';
import { GoogleMapsService } from './shared/services/google-maps/google-maps.service';
import { NotificationService } from './features/notification/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly userService = inject(UserService);
  private readonly cartStore = inject(CartStore);
  private readonly googleMapsServices = inject(GoogleMapsService);
  private readonly notificationService = inject(NotificationService);

  appReady = signal(false);

  resetApp() {
    this.appReady.set(false);
    this.initApp();
  }

  initApp() {
    this.appReady.set(true);
    this.userService.getUser();
    this.cartStore.getCart();
    this.googleMapsServices.loadGoogleMapsScript();
    this.notificationService.saveFcmToken();
  }
}
