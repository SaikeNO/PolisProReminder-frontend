import { FormControl } from '@angular/forms';

export interface PasswordsInterface {
  currentPassword: FormControl<string | null>;
  newPassword: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}
