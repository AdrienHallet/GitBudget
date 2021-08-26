import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'category'})
export class CategoryPipe implements PipeTransform {

  constructor() {
  }

  transform(value: number): string {
    return value?.toString();
  }
}
