import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
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
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<T> {
  @Input() data!: ListItem<T>[];

  @Output() selected: EventEmitter<ListItem<T>[]> = new EventEmitter<
    ListItem<T>[]
  >();

  @ContentChild(ItemDirective, { descendants: true })
  itemRef!: ItemDirective<T>;

  handleSelection(event: MatSelectionListChange) {
    console.log(event.options);
  }
}
