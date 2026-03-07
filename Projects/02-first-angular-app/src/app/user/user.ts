import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { type UserModel } from './user.model';
import { Card } from "../shared/card/card";

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrl: './user.css',
  imports: [Card],
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
