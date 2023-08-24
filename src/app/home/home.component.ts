import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent, ToolbarComponent} from '@stibosystems/ui/sidenav';
@Component({
  selector: 'ray-home',
  templateUrl: 'home.component.html',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidenavComponent, ToolbarComponent],
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
