import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyCompact', standalone: true })
export class CurrencyCompactPipe implements PipeTransform {
  transform(value: number | null | undefined, currency = 'USD'): string {
    if (value == null || isNaN(value as number)) return '-';
    const abs = Math.abs(value as number);
    let formatted = (value as number).toFixed(2);
    const pairs: Array<[number, string]> = [
      [1e12, 'T'],
      [1e9, 'B'],
      [1e6, 'M'],
      [1e3, 'K']
    ];
    for (const [n, suffix] of pairs) {
      if (abs >= n) {
        formatted = ((value as number) / n).toFixed(2) + suffix;
        break;
      }
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number(formatted.replace(/[A-Za-z]/g, ''))) + (/[A-Za-z]+$/.test(formatted) ? formatted.match(/[A-Za-z]+$/)![0] : '');
  }
}


