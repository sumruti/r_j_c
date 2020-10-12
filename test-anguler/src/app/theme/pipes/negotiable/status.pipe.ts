import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'status' })
export class Status implements PipeTransform {
    transform(value: number, exponent: string) {
        if (value == 1) {
            return exponent = "Sold";
        } else if (value == 0 || value == null) {
            return exponent = "Selling";
        } else if (value == 2 || value == null) {
            return exponent = "Sold Somewhere Else";
        }
    }
}
