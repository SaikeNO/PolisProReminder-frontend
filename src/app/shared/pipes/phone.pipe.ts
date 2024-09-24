import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber } from 'libphonenumber-js/min';

@Pipe({
  name: 'phone',
  standalone: true,
})
export class PhonePipe implements PipeTransform {
  transform(phoneValue: string | number): string | number {
    try {
      const phoneNumber = parsePhoneNumber(phoneValue + '', 'PL');
      return phoneNumber.formatNational();
    } catch (error) {
      return phoneValue;
    }
  }
}
