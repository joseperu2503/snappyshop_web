import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { TokenService } from '../../../core/services/token/token.service';
import { UserDTO } from '../dtos/user.dto';
import { UtilService } from '../../../shared/services/util/util.service';
import { StorageService } from '../../../core/services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = inject(ApiService);
  private tokenService = inject(TokenService);
  private utilService = inject(UtilService);
  private storageService = inject(StorageService);

  user = signal<UserDTO | null>(null);

  getUser() {
    if (!this.tokenService.validateToken().isValid) return;
    this.getStorageUser();
    return this.api.get<UserDTO>(`user/me`).subscribe({
      next: (response) => {
        this.setStorageUser(response);
      },
      error: (error) => {
        this.utilService.openSnackBar(
          'An error occurred while loading the user.'
        );
      },
    });
  }

  setStorageUser(user: UserDTO) {
    this.storageService.set<UserDTO>('user', user);
    this.user.set(user);
  }

  getStorageUser() {
    const user = this.storageService.get<UserDTO>('user');
    this.user.set(user);
  }

  removeStorageUser() {
    this.storageService.remove('user');
    this.user.set(null);
  }
}
