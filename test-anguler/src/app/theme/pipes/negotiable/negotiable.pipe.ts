import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'negotiable' })
export class Negotiable implements PipeTransform {
    transform(value: number, exponent: string) {
        if (value == 1) {
            return exponent = "Yes";
        } else if (value == 0) {
            return exponent = "No";
        }
    }
}
