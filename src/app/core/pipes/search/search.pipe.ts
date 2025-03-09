import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(arrayOFObject: any[], textSearch: string): any[] {
    return arrayOFObject.filter((item) =>
      item.title.toLowerCase().includes(textSearch.toLowerCase())
    );
  }
}
