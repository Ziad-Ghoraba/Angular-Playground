import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { type UserModel } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  standalone: false,
  styleUrl: './user.css',
})
export class User {
  @Input({required: true}) user!: UserModel;
  @Input({required: true}) selected = false;
  @Output() select = new EventEmitter<string>();

  get imagePath() {
    return `../../assets/users/${this.user.avatar}`;
  }

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
