import { NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
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
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';

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

  @Output() selected: EventEmitter<ListItem<T>[]> = new EventEmitter<
    ListItem<T>[]
  >();
  @Output() pageChange: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;

  @ContentChild(ItemDirective, { descendants: true })
  itemRef!: ItemDirective<T>;

  handleSelection(event: MatSelectionListChange) {
    console.log(event.options);
  }

  handleIndexChange(index: number) {
    if (index === 0) {
      return;
    }
    if(this.lastLoaded) {
      return;
    }
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end === total) {
      this.pageChange.emit();
    }
  }

  trackByIdx(i: number) {
    return i;
  }

  calculateHeight() {
    if (this.data.length) {
      return {
        height:
          this.data.length < this.batch
            ? `${(this.data.length + 1) * 48}px`
            // : `${this.batch * 48}px`,
            : '480px'
      };
    }
    // return { height: `${this.batch * 48}px` };
    return { height: '480px' };
  }
}
