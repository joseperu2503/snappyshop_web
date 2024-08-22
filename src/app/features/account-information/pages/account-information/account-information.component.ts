import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UtilService } from '../../../../shared/services/util/util.service';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SharedModule } from '../../../../shared/shared.module';
import { SvgIconComponent } from 'angular-svg-icon';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-account-information',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    SharedModule,
    SvgIconComponent,
  ],
  templateUrl: './account-information.component.html',
  styleUrl: './account-information.component.scss',
})
export default class AccountInformationComponent implements OnInit {
  private utilService = inject(UtilService);
  private userService = inject(UserService);

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  ngOnInit() {
    const user = this.userService.user();
    this.form.patchValue({
      name: user?.name,
      email: user?.email,
    });
  }

  loading = false;

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const { email, name } = this.form.getRawValue();
    this.userService
      .updateProfile({
        name: name,
        email: email,
        profile_photo: this.userService.user()!.profile_photo,
      })
      .subscribe({
        next: (response) => {
          this.userService.setStorageUser(response.data);
          this.loading = false;
        },
        error: (error) => {
          const defaultMessage =
            'An error occurred while updating your account information.';
          if (error?.status == 422) {
            this.utilService.openSnackBar(
              error?.error?.message ?? defaultMessage
            );
          } else {
            this.utilService.openSnackBar(defaultMessage);
          }

          this.loading = false;
        },
      });
  }
}
