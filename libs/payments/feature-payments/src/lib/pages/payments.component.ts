import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ItemDirective, ListComponent } from '@stibosystems/ui/list';
import { PaymentsFacade } from './payments.facade';
import { NgFor, NgIf } from '@angular/common';
import { TRANSLOCO_SCOPE, TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
@Component({
  selector: 'app-payments',
  templateUrl: 'payments.component.html',
  styleUrls: ['./payments.component.scss'],
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
    NgIf
  ],
  providers: [PaymentsFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsComponent {
  protected readonly _facade = inject(PaymentsFacade);
}
