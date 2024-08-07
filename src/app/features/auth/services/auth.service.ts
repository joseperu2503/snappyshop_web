import { Injectable, inject } from '@angular/core';
import { LoginFormDTO } from '../dtos/login-form.dto';
import { LoginResponseDTO } from '../dtos/login-response.dto';
import { ApiService } from '../../../core/services/api/api.service';
import { tap } from 'rxjs';
import { TokenService } from '../../../core/services/token/token.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import LoginComponent from '../pages/login/login.component';
import { UserService } from '../../user/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(ApiService);
  private tokenService = inject(TokenService);
  private userService = inject(UserService);

  readonly dialog = inject(MatDialog);

  login(data: LoginFormDTO) {
    return this.api
      .post<LoginResponseDTO>(`auth/login`, data)
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      );
  }

  openLoginDialog(): void {
    const dialogRef: MatDialogRef<LoginComponent, boolean> = this.dialog.open(
      LoginComponent,
      {
        width: '100%',
        maxWidth: '420px',
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        window.location.reload();
      }
    });
  }

  logout() {
    this.tokenService.removeToken();
    this.userService.removeStorageUser();
    window.location.reload();
  }
}
