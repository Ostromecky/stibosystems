import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { ColumnComponent } from './column/column.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    NgFor,
    NgTemplateOutlet,
    ColumnComponent,
    MatCheckboxModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements OnInit, AfterViewInit {
  @Input() data!: T[];
  @Input() columns!: string[];

  @Output() selected: EventEmitter<T[]> = new EventEmitter<T[]>();

  @ContentChildren(ColumnComponent<T>, { descendants: true })
  columnComponents!: QueryList<ColumnComponent<T>>;

  selection = new SelectionModel<T>(true, []);

  ngOnInit() {
    console.log(this.data);
  }

  ngAfterViewInit(): void {
    console.log(this.columnComponents);
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

  handleSelection(event: MatCheckboxChange, row: T) {
    event ? this.selection.toggle(row) : null;
    this.selected.emit(this.selection.selected);
  }
}
