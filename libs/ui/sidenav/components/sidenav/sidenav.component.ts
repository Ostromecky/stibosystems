import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
  MediaMatcher,
} from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ViewChild,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SidenavController } from '../../utils/sidenav-controller';

type Navigation = {
  id: string;
  title: string;
  translate: string;
  type: 'item' | 'group' | 'collapsable' | 'separator';
  icon?: string;
  url?: string;
};

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterLinkActive,
    RouterOutlet,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterLink,
  ],
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SidenavController,
      useExisting: forwardRef(() => SidenavComponent),
    },
  ],
})
export class SidenavComponent implements SidenavController {
  collapsed = signal(false);
  isMobile = signal(false);
  private _destroy$ = new Subject<void>();

  mediaMatcher = inject(MediaMatcher);
  navigation: Navigation[] = [
    {
      id: 'projects',
      title: 'Payments',
      translate: 'Navbar.Projects',
      type: 'item',
      icon: 'payments',
      url: '/payments',
    },
    {
      id: 'users',
      title: 'Users',
      translate: 'Navigation.Users',
      type: 'item',
      icon: 'people',
      url: '/users',
    },
    {
      id: 'countries',
      title: 'Countries',
      translate: 'Navigation.Countries',
      type: 'item',
      icon: 'public',
      url: '/countries',
    },
  ];

  @ViewChild('snav', { static: false }) sidenav!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.TabletPortrait])
      .pipe(takeUntil(this._destroy$))
      .subscribe((result) => {
        this.collapsed.set(false);
        this.isMobile.set(result.matches);
      });

    inject(DestroyRef).onDestroy(() => {
      this._destroy$.next();
      this._destroy$.complete();
    });
  }

  trackByFn(index: number, item: Navigation) {
    return item.id;
  }

  toggle() {
    this.sidenav.toggle();
    this.cdr.markForCheck();
  }
}
