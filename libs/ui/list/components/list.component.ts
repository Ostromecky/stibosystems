import { SelectionModel } from '@angular/cdk/collections';
import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ItemDirective } from '../public_api';
import { ListItem } from '../types';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgTemplateOutlet,
    MatListModule,
    MatCheckboxModule,
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<T> implements OnInit {
  @Input() data!: ListItem<T>[];

  @Output() selected: EventEmitter<ListItem<T>[]> = new EventEmitter<
    ListItem<T>[]
  >();

  @ContentChild(ItemDirective, { descendants: true })
  itemRef!: ItemDirective<T>;

  selection = new SelectionModel<ListItem<T>>(true, []);

  ngOnInit() {
    console.log(this.data);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.forEach((row) => this.selection.select(row));
  }

  handleSelection(event: MatCheckboxChange, row: ListItem<T>) {
    event ? this.selection.toggle(row) : null;
    this.selected.emit(this.selection.selected);
  }
}
