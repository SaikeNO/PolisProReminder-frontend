import { FormControl } from '@angular/forms';

export interface LoginModel {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
