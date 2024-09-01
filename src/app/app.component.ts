import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './features/auth/services/auth/auth.service';
import { skip } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly appService = inject(AppService);

  ngOnInit() {
    this.route.fragment.pipe(skip(1)).subscribe((fragment) => {
      if (fragment) {
        const params = new URLSearchParams(fragment);
        const idToken = params.get('id_token');
        if (idToken) {
          this.authService.loginGoogle(idToken).subscribe({
            next: () => {
              this.appService.initApp();
              this.router.navigate(['/'], { replaceUrl: true });
            },
            error: (error) => {
              this.appService.initApp();
              this.router.navigate(['/'], { replaceUrl: true });
            },
          });

          return;
        }
      }

      this.appService.initApp();
    });
  }
}
