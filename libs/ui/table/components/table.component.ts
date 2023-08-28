import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ColumnComponent } from './column/column.component';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  standalone: true,
  imports: [MatTableModule, NgFor, NgTemplateOutlet, ColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() data!: unknown[];
  @Input() columns!: string[];

  @ContentChildren(ColumnComponent, { descendants: true })
  columnComponents!: QueryList<ColumnComponent>;

  ngOnInit() {
    console.log(this.data);
  }

  ngAfterViewInit(): void {
    console.log(this.columnComponents);
  }
}
