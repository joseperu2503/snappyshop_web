import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../features/user/services/user.service';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-user-button',
  standalone: true,
  imports: [
    SvgIconComponent,
    CommonModule,
    MatRippleModule,
    NgClickOutsideDirective,
    ButtonComponent,
  ],
  templateUrl: './user-button.component.html',
  styleUrl: './user-button.component.scss',
})
export class UserButtonComponent {
  userService = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);
  showMenu = signal<boolean>(false);

  toggleMenu() {
    this.showMenu.update((value) => !value);
  }

  closeMenu() {
    this.showMenu.set(false);
  }

  onClickMenuItem(menuItem: MenuItem) {
    this.closeMenu();
    menuItem.onPress();
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'assets/icons/profile.svg',
      label: 'Account Information',
      onPress: () => {
        this.router.navigate(['/account-information']);
      },
    },
    {
      icon: 'assets/icons/card.svg',
      label: 'My Cards',
      onPress: () => {},
    },
    {
      icon: 'assets/icons/order.svg',
      label: 'My Orders',
      onPress: () => {},
    },
    {
      icon: 'assets/icons/box.svg',
      label: 'My Addresses',
      onPress: () => {},
    },
    {
      icon: 'assets/icons/lock.svg',
      label: 'Change Password',
      onPress: () => {},
    },
    {
      icon: 'assets/icons/logout.svg',
      label: 'Logout',
      onPress: () => {
        this.authService.logout();
      },
    },
  ]);
}

interface MenuItem {
  icon: string;
  label: string;
  onPress: Function;
}
