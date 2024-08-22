import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { TokenService } from '../../../core/services/token/token.service';
import { UserDTO } from '../dtos/user.dto';
import { UtilService } from '../../../shared/services/util/util.service';
import { StorageService } from '../../../core/services/storage/storage.service';
import { NotificationService } from '../../notification/services/notification.service';
import {
  UpdateAccountInformationRequestDTO,
  UpdateAccountInformationResponseDTO,
} from '../dtos/update-account-information.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = inject(ApiService);
  private tokenService = inject(TokenService);
  private utilService = inject(UtilService);
  private storageService = inject(StorageService);
  private notificationService = inject(NotificationService);

  user = signal<UserDTO | null>(null);

  getUser() {
    if (!this.tokenService.validateToken().isValid) return;
    this.getStorageUser();
    return this.api.get<UserDTO>(`account/profile`).subscribe({
      next: (response) => {
        this.setStorageUser(response);
        this.notificationService.saveFcmToken();
      },
      error: () => {
        this.utilService.openSnackBar(
          'An error occurred while loading the user.'
        );
      },
    });
  }

  updateProfile(data: Omit<UpdateAccountInformationRequestDTO, 'id'>) {
    const body: UpdateAccountInformationRequestDTO = {
      id: this.user()!.id,
      name: data.name,
      email: data.email,
      profile_photo: this.user()!.profile_photo,
    };

    return this.api.put<UpdateAccountInformationResponseDTO>(
      `account/profile`,
      body
    );
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
