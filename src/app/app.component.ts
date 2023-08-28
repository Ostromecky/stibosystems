import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemplateOutletDirective } from '@stibosystems/utils/template-outlet';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, TemplateOutletDirective],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'stibosystems';
}
