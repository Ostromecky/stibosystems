import { Directive, TemplateRef } from '@angular/core';
import { ColumnComponent } from '../components/column/column.component';

@Directive({
  selector: '[appHeader]',
  standalone: true
})
export class HeaderDirective<T> {

  constructor(public templateRef: TemplateRef<unknown>, columnComponent: ColumnComponent<T>) {
    columnComponent.headerRef = templateRef;
  }

}
