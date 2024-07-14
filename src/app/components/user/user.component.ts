import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/entities/contracts';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {  

  @Input() user!: User;

  @Output() userClicked = new EventEmitter<string>();

  onUseClicked(name: string) {
    this.userClicked.emit(name);
  }

}
