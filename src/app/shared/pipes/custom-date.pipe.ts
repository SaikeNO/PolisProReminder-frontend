import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate',
  standalone: true,
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
  override transform(value: any, format: string = 'dd/MM/yyyy'): any {
    return super.transform(value, format);
  }
}
