import { Injectable, inject } from '@angular/core';
import { LoginFormDTO } from '../dtos/login-form.dto';
import { LoginResponseDTO } from '../dtos/login-response.dto';
import { ApiService } from '../../../core/services/api/api.service';
import { tap } from 'rxjs';
import { TokenService } from '../../../core/services/token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(ApiService);
  private tokenService = inject(TokenService);

  login(data: LoginFormDTO) {
    return this.api
      .post<LoginResponseDTO>(`auth/login`, data)
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      );
  }
}
