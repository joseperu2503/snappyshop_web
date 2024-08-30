import { CommonModule } from '@angular/common';
import {
  Component,
  Host,
  Input,
  Optional,
  SkipSelf,
  forwardRef,
  signal,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [SvgIconComponent, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() value?: string;
  @Input() placeholder: string = '';
  @Input() formControlName: string = '';
  @Input() errors = {};
  @Input() disabled: boolean = false;
  @Input() name?: string;
  @Input() type?: string;

  showPassword = signal(false);

  get innerErrors() {
    return {
      required: 'This field is required',
      email: 'Invalid email format',
      ...this.errors,
    };
  }

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) {}

  // Function to call when the value changes
  onChange: Function = () => {};

  // Function to call when the input is touched
  onTouched: Function = () => {};

  get control(): FormControl {
    return this.controlContainer?.control?.get(
      this.formControlName
    ) as FormControl;
  }

  get errorMessage(): string | null {
    const control = this.control;
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return this.innerErrors.required;
      }
      if (control.errors['email']) {
        return this.innerErrors.email;
      }
    }
    return null;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  togglePassword() {
    this.showPassword.update((value) => !value);
  }
}
