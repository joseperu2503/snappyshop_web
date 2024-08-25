import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './features/user/services/user.service';
import { CartStore } from './features/cart/stores/cart.store';
import { GoogleMapsService } from './shared/services/google-maps/google-maps.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private userService = inject(UserService);
  private cartStore = inject(CartStore);
  private googleMapsServices = inject(GoogleMapsService);

  ngOnInit() {
    this.userService.getUser();
    this.cartStore.getCart();
    this.googleMapsServices.loadGoogleMapsScript();
  }
}
