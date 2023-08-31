import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { ItemDirective } from '../public_api';
import { ListItem } from '../types';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgTemplateOutlet,
    MatListModule,
    ScrollingModule,
    MatCheckboxModule,
    NgIf,
    MatProgressSpinnerModule,
    MatIconModule,
    NgStyle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<T> {
  @Input() data!: ListItem<T>[];
  @Input() batch = 20;
  @Input() end = false;
  @Input() lastLoaded = false;
  @Input() loading = false;

  selection = new SelectionModel(true);

  @Output() selected: EventEmitter<ListItem<T>[]> = new EventEmitter<
    ListItem<T>[]
  >();
  @Output() pageChange: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport | undefined;

  @ContentChild(ItemDirective, { descendants: true })
  itemRef!: ItemDirective<T>;

  handleSelection(selection: MatSelectionListChange) {
    selection.options[0].selected
      ? this.selection.select(selection.options[0].value)
      : this.selection.deselect(selection.options[0].value);

    this.selected.emit(this.selection.selected as ListItem<T>[]);
  }

  handleIndexChange(index: number) {
    if (index === 0) {
      return;
    }
    if (this.lastLoaded) {
      return;
    }
    if (this.viewport) {
      const end = this.viewport.getRenderedRange().end;
      const total = this.viewport.getDataLength();
      if (this.loading) {
        return;
      }
      if (end === total && !this.loading) {
        this.pageChange.emit();
      }
    }
  }

  trackByIdx(i: number) {
    return i;
  }

  calculateHeight() {
    if (this.data.length > 0) {
      return {
        height:
          this.data.length < this.batch
            ? `${(this.data.length + 1) * 48}px`
            : // : `${this.batch * 48}px`,
              '480px',
      };
    }
    // return { height: `${this.batch * 48}px` };
    return { height: '480px' };
  }
}
