import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SearchInputComponent } from '../../../features/dashboard/components/search-input/search-input.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { UserService } from '../../../features/user/services/user.service';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

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
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  userService = inject(UserService);
}
