import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  transform(value: number | null | undefined, ...args: unknown[]): string {
    if (!value) {
      return '';
    }

    // Formatear el número a string con comas y puntos
    const formattedValue = value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Agregar el símbolo de dólar
    return `$${formattedValue}`;
  }
}
