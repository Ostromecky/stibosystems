import { Directive, TemplateRef } from '@angular/core';
import { ColumnComponent } from '../components/column/column.component';

@Directive({
  selector: '[appCell]',
  standalone: true,
})
export class CellDirective<T> {
  constructor(
    public templateRef: TemplateRef<{
      $implicit: T;
    }>,
    columnComponent: ColumnComponent<T>
  ) {
    columnComponent.cellRef = templateRef;
  }
}
