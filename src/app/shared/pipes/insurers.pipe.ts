import { Pipe, PipeTransform } from '@angular/core';
import { InsurerBasicInfo } from '../interfaces/insurer';

@Pipe({
  name: 'insurers',
  standalone: true,
})
export class InsurersPipe implements PipeTransform {
  transform(types: InsurerBasicInfo[]): string {
    return types.map((t) => t.name).join(', ');
  }
}
