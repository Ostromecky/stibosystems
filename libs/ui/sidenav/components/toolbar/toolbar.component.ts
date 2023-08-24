import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subject, takeUntil } from 'rxjs';
import { SidenavController } from '../../utils/sidenav-controller';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {
  private _destroy$ = new Subject<void>();
  buttonVisible = signal(true);
  private readonly _sidenav = inject(SidenavController, { host: true });
  private readonly _breakpointObserver = inject(BreakpointObserver);

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this._destroy$.next();
      this._destroy$.complete();
    });
  }

  ngOnInit(): void {
    this._breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.TabletPortrait])
      .pipe(takeUntil(this._destroy$))
      .subscribe((result) => this.buttonVisible.set(result.matches));
  }

  toggleSidebarOpen(): void {
    this._sidenav.toggle();
  }
}
