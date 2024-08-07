import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SearchInputComponent } from '../../../features/dashboard/components/search-input/search-input.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { UserService } from '../../../features/user/services/user.service';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../features/auth/services/auth.service';
import { UserButtonComponent } from '../../components/user-button/user-button.component';

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
  userService = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);

  login() {
    this.authService.openLoginDialog();
  }

  goToWishlist() {
    if (!this.userService.user()) {
      this.authService.openLoginDialog();
      return;
    }
    this.router.navigate(['/wishlist']);
  }

  goToCart() {
    if (!this.userService.user()) {
      this.authService.openLoginDialog();
      return;
    }
    this.router.navigate(['/cart']);
  }
}
