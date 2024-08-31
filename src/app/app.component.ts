import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UserService } from './features/user/services/user.service';
import { CartStore } from './features/cart/stores/cart.store';
import { GoogleMapsService } from './shared/services/google-maps/google-maps.service';
import { AuthService } from './features/auth/services/auth/auth.service';
import { skip } from 'rxjs';
import { NotificationService } from './features/notification/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly cartStore = inject(CartStore);
  private readonly googleMapsServices = inject(GoogleMapsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);

  appReady = signal(false);

  ngOnInit() {
    this.route.fragment.pipe(skip(1)).subscribe((fragment) => {
      if (fragment) {
        const params = new URLSearchParams(fragment);
        const idToken = params.get('id_token');
        if (idToken) {
          this.authService.loginGoogle(idToken).subscribe({
            next: () => {
              this.initApp();
              this.router.navigate(['/'], { replaceUrl: true });
            },
            error: (error) => {
              this.initApp();
              this.router.navigate(['/'], { replaceUrl: true });
            },
          });

          return;
        }
      }

      this.initApp();
    });
  }

  initApp() {
    if (this.appReady()) return;
    this.appReady.set(true);
    this.userService.getUser();
    this.cartStore.getCart();
    this.googleMapsServices.loadGoogleMapsScript();
    this.notificationService.saveFcmToken();
  }
}
