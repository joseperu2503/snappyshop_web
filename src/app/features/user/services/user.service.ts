import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { TokenService } from '../../../core/services/token/token.service';
import { UserDTO } from '../dtos/user.dto';
import { UtilService } from '../../../shared/services/util/util.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = inject(ApiService);
  private tokenService = inject(TokenService);
  private utilService = inject(UtilService);

  user = signal<UserDTO | null>(null);

  getUser() {
    if (!this.tokenService.validateToken().isValid) return;
    return this.api.get<UserDTO>(`user/me`).subscribe({
      next: (response) => {
        this.user.set(response);
      },
      error: (error) => {
        this.utilService.openSnackBar(
          'An error occurred while loading the user.'
        );
      },
    });
  }
}
