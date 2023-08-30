import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { ItemDirective, ListComponent } from '@stibosystems/ui/list';
import { CountriesFacade } from './countries.facade';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [
    ListComponent,
    ItemDirective,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    TranslocoDirective,
    NgFor,
    TranslocoPipe,
    NgIf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CountriesFacade],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent {
  protected readonly _facade = inject(CountriesFacade);
}
