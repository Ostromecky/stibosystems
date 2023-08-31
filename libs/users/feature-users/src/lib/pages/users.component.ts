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
import { ListItem } from '@stibosystems/ui/list/types';
import { UserItem } from '@stibosystems/users/data-access';
import { AvatarComponent } from '../components/avatar.component';
import { UsersFacade } from './users.facade';

@Component({
  selector: 'app-users',
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
    AvatarComponent,
    NgFor,
    TranslocoPipe,
    NgIf,
  ],
  providers: [UsersFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  protected readonly _facade = inject(UsersFacade);

  handlePageChange() {
    this._facade.$page.update((value) => value + 1);
  }

  handleSelection(event: ListItem<UserItem>[]) {
    console.log('Users selected: ', event);
  }
}
