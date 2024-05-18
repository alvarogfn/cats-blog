import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substring',
})
export class SubstringPipe implements PipeTransform {
  transform(value: string, amount: number, overflow: string = ''): string {
    if (value.length <= amount) return value;
    return value.substring(0, amount).concat(overflow);
  }
}
