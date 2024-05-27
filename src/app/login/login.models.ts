import { FormControl } from '@angular/forms';

export interface LoginModel {
  name: FormControl<string | null>;
  password: FormControl<string | null>;
}
