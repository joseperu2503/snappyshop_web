import { Component, inject, signal } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SharedModule } from '../../../../shared/shared.module';
import { SvgIconComponent } from 'angular-svg-icon';
import { UtilService } from '../../../../shared/services/util/util.service';
import { LoadingStatus } from '../../../../core/enums/loading-status.enum';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    SharedModule,
    SvgIconComponent,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export default class ChangePasswordComponent {
  private utilService = inject(UtilService);
  private passwordService = inject(PasswordService);

  form = new FormGroup({
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    passwordConfirmation: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  loading = signal<LoadingStatus>(LoadingStatus.None);
  LoadingStatus = LoadingStatus;

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(LoadingStatus.Loading);
    const { password, passwordConfirmation } = this.form.getRawValue();

    this.passwordService
      .updatePassword({
        password: password,
        passwordConfirmation: passwordConfirmation,
      })
      .subscribe({
        next: (response) => {
          this.utilService.openSnackBar(response.message);
          this.form.patchValue({
            password: '',
            passwordConfirmation: '',
          });
          this.form.markAsUntouched();
          this.loading.set(LoadingStatus.Sucess);
        },
        error: (error) => {
          const defaultMessage =
            'An error occurred while updating the password.';
          this.utilService.openSnackBar(defaultMessage);

          this.loading.set(LoadingStatus.Error);
        },
      });
  }
}
