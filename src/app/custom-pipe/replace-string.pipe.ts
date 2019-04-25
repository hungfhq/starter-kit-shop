import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceStringPipe'
})
export class ReplaceStringPipe implements PipeTransform {
  transform(input?: string, pattern?: any, replacement?: any): any {
    return input ? input.replace(new RegExp(pattern, 'g'), replacement) : '';
  }
}
