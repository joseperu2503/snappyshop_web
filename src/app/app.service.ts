import { Injectable, Injector, inject, signal } from '@angular/core';
import { UserService } from './features/user/services/user.service';
import { CartStore } from './features/cart/stores/cart.store';
import { NotificationService } from './features/notification/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly userService = inject(UserService);
  private readonly notificationService = inject(NotificationService);
  private readonly injector = inject(Injector);

  appReady = signal(false);

  resetApp() {
    this.appReady.set(false);
    this.initApp();
  }

  initApp() {
    this.appReady.set(true);
    this.userService.getUser();

    // Lazy inject CartStore to avoid circular dependency
    const cartStore = this.injector.get(CartStore);
    cartStore.getCart();

    this.notificationService.saveFcmToken();
  }
}
