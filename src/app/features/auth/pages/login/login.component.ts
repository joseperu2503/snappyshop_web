import { Component, inject, signal } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UtilService } from '../../../../shared/services/util/util.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GoogleAuthService } from '../../services/google-auth/google-auth.service';
import { SocialButtonComponent } from '../../../../shared/components/social-button/social-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    SocialButtonComponent,
    MatDialogModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  private authService = inject(AuthService);
  private googleAuthService = inject(GoogleAuthService);
  private utilService = inject(UtilService);
  dialogRef: MatDialogRef<LoginComponent, boolean> = inject(
    MatDialogRef<LoginComponent, boolean>
  );

  form = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  loading = signal(false);
  loadingGoogle = signal(false);

  login() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const { email, password } = this.form.getRawValue();
    this.authService
      .login({
        email,
        password,
      })
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.loading.set(false);
        },
        error: (error) => {
          this.utilService.openSnackBar(error.error.message);
          this.loading.set(false);
        },
      });
  }

  loginGoogle() {
    this.loadingGoogle.set(true);
    this.googleAuthService.login();
  }
}
