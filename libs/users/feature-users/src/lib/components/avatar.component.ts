import { NgIf, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
@Component({
  selector: 'app-avatar',
  templateUrl: 'avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgOptimizedImage],
})
export class AvatarComponent {
  @Input() src: string | undefined;
  @Input() first: string | undefined;
  @Input() last: string | undefined;

  get initials(): string {
    if (this.first && this.last) {
      return `${this.first.charAt(0)}${this.last.charAt(0)}`;
    }
    return '';
  }
}
