import { Directive, TemplateRef } from '@angular/core';
import { ColumnComponent } from '../components/column/column.component';

@Directive({
  selector: '[appCell]',
  standalone: true
})
export class CellDirective {

  constructor(public templateRef: TemplateRef<unknown>, columnComponent: ColumnComponent) {
    columnComponent.cellRef = templateRef;
  }

}
