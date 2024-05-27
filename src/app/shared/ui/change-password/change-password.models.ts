import { FormControl } from '@angular/forms';

export interface PasswordsInterface {
  oldPassword: FormControl<string | null>;
  newPassword: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}
