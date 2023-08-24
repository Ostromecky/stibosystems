import { MatSidenav } from '@angular/material/sidenav';

export abstract class SidenavController {
  abstract readonly sidenav: MatSidenav;
  abstract toggle(): void;
}
