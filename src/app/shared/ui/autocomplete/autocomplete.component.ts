import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, combineLatest, map, startWith } from 'rxjs';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
  @Input({ required: true }) options!: Option[];
  @Input({ required: true }) control!: FormControl;
  @Input() label: string = '';
  @Input() errorMessage: string = '';

  public filteredOptions!: Observable<Option[]>;

  ngOnInit() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith<number | string>(''),
      map((value) => {
        return typeof value === 'string' ? this.filter(value) : this.options.slice();
      }),
    );
  }

  public displayFn(id: number): string {
    let index = this.options.findIndex((option) => option.id === id);
    return this.options[index].value;
  }

  private filter(value: string): Option[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.value.toLowerCase().includes(filterValue));
  }
}
