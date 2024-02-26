import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateFormat'
})
export class CustomDateFormatPipe implements PipeTransform {
  transform(value: string): string {
    const [fecha, hora] = value.split('T');
    const [año, mes, dia] = fecha.split('-');

    return `${dia}/${mes}/${año}`;
  }
}
