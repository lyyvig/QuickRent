import { backendUrl } from './../services/serviceConstants';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apiImage'
})
export class ApiImagePipe implements PipeTransform {

  transform(value: string): string {
    return backendUrl + value;
  }

}
