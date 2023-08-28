import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { CellDirective } from '../../directives/cell.directive';
import { HeaderDirective } from '../../directives/header.directive';

@Component({
  selector: 'app-column',
  templateUrl: 'column.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgTemplateOutlet, HeaderDirective, CellDirective],
})
export class ColumnComponent<T> {
  @ContentChild(TemplateRef, { static: false })
  templateRef!: TemplateRef<{$implicit: string, row: T}>;
  cellRef!: TemplateRef<unknown>;
  headerRef!: TemplateRef<unknown>;
  @Input() label!: string;
  @Input() column!: string;
}
