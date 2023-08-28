import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ItemDirective,
  ListComponent
} from '@stibosystems/ui/list';
import { ListItem } from '@stibosystems/ui/list/types';

export interface IData {
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-payments',
  templateUrl: 'payments.component.html',
  standalone: true,
  imports: [ListComponent, ItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsComponent {
  ELEMENT_DATA: ListItem<IData>[] = [
    { title: 'Helium', data: { weight: 4.0026, symbol: 'He' } },
    { title: 'Lithium', data: { weight: 6.941, symbol: 'Li' } },
    { title: 'Beryllium', data: { weight: 9.0122, symbol: 'Be' } },
    { title: 'Boron', data: { weight: 10.811, symbol: 'B' } },
    { title: 'Carbon', data: { weight: 12.0107, symbol: 'C' } },
    { title: 'Nitrogen', data: { weight: 14.0067, symbol: 'N' } },
    { title: 'Oxygen', data: { weight: 15.9994, symbol: 'O' } },
    { title: 'Fluorine', data: { weight: 18.9984, symbol: 'F' } },
    { title: 'Neon', data: { weight: 20.1797, symbol: 'Ne' } },
  ];
}
