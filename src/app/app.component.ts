import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './features/user/services/user.service';
import { CartStore } from './features/cart/stores/cart.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private userService = inject(UserService);
  private cartStore = inject(CartStore);

  ngOnInit() {
    this.userService.getUser();
    this.cartStore.getCart();
  }
}
