import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SearchInputComponent } from '../../../features/dashboard/components/search-input/search-input.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../features/auth/services/auth/auth.service';
import { UserButtonComponent } from '../../components/user-button/user-button.component';
import { CartStore } from '../../../features/cart/stores/cart.store';
import { UserService } from '../../../features/user/services/user.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    SearchInputComponent,
    SvgIconComponent,
    RouterOutlet,
    RouterLink,
    MatRippleModule,
    MatButtonModule,
    UserButtonComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  private readonly authService = inject(AuthService);
  readonly userService = inject(UserService);

  readonly cartStore = inject(CartStore);

  router = inject(Router);

  login() {
    this.authService.openLoginDialog();
  }

  goToWishlist() {
    if (!this.authService.verifyAuth()) {
      this.authService.openLoginDialog();
      return;
    }
    this.router.navigate(['/wishlist']);
  }

  goToCart() {
    if (!this.authService.verifyAuth()) {
      this.authService.openLoginDialog();
      return;
    }
    this.router.navigate(['/cart']);
  }
}
