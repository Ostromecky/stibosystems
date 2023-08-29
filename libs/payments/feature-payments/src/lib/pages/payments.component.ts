import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ItemDirective, ListComponent } from '@stibosystems/ui/list';
import { PaymentsFacade } from './payments.facade';
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
    FormsModule,
  ],
  providers: [PaymentsFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsComponent {
  protected readonly _facade = inject(PaymentsFacade);
}
