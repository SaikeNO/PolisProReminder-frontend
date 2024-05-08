import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable, map, startWith } from 'rxjs';
import { Option } from './autocomplete.model';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) options!: Option[];
  @Input() label: string = '';
  @Input() errorMessage: string = '';
  public filteredOptions!: Observable<Option[]>;

  ngOnInit() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => (value ? this.filter(value) : this.options?.slice())),
    );
  }

  private filter(value: string): Option[] {
    const filterValue = value.toLowerCase();

    return this.options?.filter((option) => option.value.toLowerCase().includes(filterValue));
  }
}
