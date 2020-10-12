import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'postType' })
export class PostType implements PipeTransform {
    transform(value: number, exponent: string) {
        if (value == 0) {
            return exponent = "Photo";
        } else if (value == 1) {
            return exponent = "Video";
        }
    }
}