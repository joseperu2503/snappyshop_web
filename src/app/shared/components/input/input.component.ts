import {
  Component,
  Host,
  Input,
  Optional,
  SkipSelf,
  forwardRef,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
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
  @Input() placeholder: string = '';
  @Input() formControlName: string = '';

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) {}

  private innerValue: any = '';
  disabled: boolean = false;
  // Function to call when the value changes
  onChange: any = () => {};

  // Function to call when the input is touched
  onTouched: any = () => {};

  get value(): any {
    return this.innerValue;
  }

  get control(): FormControl {
    return this.controlContainer?.control?.get(
      this.formControlName
    ) as FormControl;
  }

  get errorMessage(): string | null {
    const control = this.control;
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['minlength']) {
        return `Minimum length is ${control.errors['minlength'].requiredLength}`;
      }

      if (control.errors['email']) {
        return 'Invalid email format';
      }
    }
    return null;
  }

  set value(val: any) {
    if (val !== this.innerValue) {
      this.innerValue = val;
      this.onChange(val);
    }
  }

  writeValue(value: any): void {
    this.innerValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Handling input events
  handleInput(event: any): void {
    this.value = event.target.value;
  }

  handleBlur(): void {
    this.onTouched();
  }
}
