import { Injectable, inject } from '@angular/core';
import { LoginFormDTO } from '../../dtos/login-form.dto';
import { LoginResponseDTO } from '../../dtos/login-response.dto';
import { ApiService } from '../../../../core/services/api/api.service';
import { tap } from 'rxjs';
import { TokenService } from '../../../../core/services/token/token.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import LoginComponent from '../../pages/login/login.component';
import { UserService } from '../../../user/services/user.service';
import { AppService } from '../../../../app.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(ApiService);
  private tokenService = inject(TokenService);
  private userService = inject(UserService);
  readonly dialog = inject(MatDialog);
  readonly appService = inject(AppService);
  readonly router = inject(Router);

  login(data: LoginFormDTO) {
    return this.api.post<LoginResponseDTO>(`auth/login`, data).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.access_token);
        this.userService.setStorageUser(response.user);
      })
    );
  }

  loginGoogle(idToken: string) {
    const body = {
      id_token: idToken,
    };

    return this.api.post<LoginResponseDTO>(`auth/login-google`, body).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.access_token);
        this.userService.setStorageUser(response.user);
      })
    );
  }

  openLoginDialog(): void {
    const dialogRef: MatDialogRef<LoginComponent, boolean> = this.dialog.open(
      LoginComponent,
      {
        width: '100%',
        maxWidth: '420px',
        maxHeight: '100vh',
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.appService.resetApp();
        window.location.reload();
      }
    });
  }

  verifyAuth() {
    const { isValid } = this.tokenService.validateToken();
    return isValid;
  }

  logout() {
    this.tokenService.removeToken();
    this.userService.removeStorageUser();
    // this.appService.resetApp();
    window.location.reload();
  }
}
