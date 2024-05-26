import { Pipe, PipeTransform } from '@angular/core';
import { InsuranceType } from '../interfaces/insuranceType';

@Pipe({
  name: 'insuranceType',
  standalone: true,
})
export class InsuranceTypePipe implements PipeTransform {
  transform(types: InsuranceType[]): string {
    return types.map((t) => t.name).join(', ');
  }
}
