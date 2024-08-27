import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { UpdatePasswordRequest } from '../dtos/update-password.dto';
import { SuccessResponse } from '../../../shared/dtos/success-response.dto';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private api = inject(ApiService);

  updatePassword(data: UpdatePasswordRequest) {
    const body = {
      password: data.password,
      password_confirmation: data.passwordConfirmation,
    };

    return this.api.put<SuccessResponse>(`password`, body);
  }
}
