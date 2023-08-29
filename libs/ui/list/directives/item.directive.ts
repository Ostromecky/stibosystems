import { Directive, Input, TemplateRef } from '@angular/core';
import { ListItem } from '../types';

interface ListTemplateContext<T> {
  $implicit: ListItem<T>;
  index: number;
}

@Directive({
  selector: '[appItem]',
  standalone: true,
})
export class ItemDirective<T> {
  @Input() appItemList!: ListItem<T>[];
  constructor(
    public templateRef: TemplateRef<ListTemplateContext<T>>
  ) {}

  static ngTemplateContextGuard<TContext>(
    dir: ItemDirective<TContext>,
    ctx: unknown
  ): ctx is ListTemplateContext<TContext> {
    return true;
  }
}
