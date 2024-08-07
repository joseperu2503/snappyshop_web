import { Injectable, inject } from '@angular/core';
import { LoginFormDTO } from '../dtos/login-form.dto';
import { LoginResponseDTO } from '../dtos/login-response.dto';
import { ApiService } from '../../../core/services/api/api.service';
import { tap } from 'rxjs';
import { TokenService } from '../../../core/services/token/token.service';
import { MatDialog } from '@angular/material/dialog';
import LoginComponent from '../pages/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(ApiService);
  private tokenService = inject(TokenService);
  readonly dialog = inject(MatDialog);

  login(data: LoginFormDTO) {
    return this.api
      .post<LoginResponseDTO>(`auth/login`, data)
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      );
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '100%',
      maxWidth: '420px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
