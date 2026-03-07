import { Component, signal } from '@angular/core';
import { DUMMY_USERS } from './user/dummy-users';


@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('first-angular-app');
  users = DUMMY_USERS;
  selectedUserId? : string;
  addTaskUserId? : string;

  get selectedUser() {
    return this.users.find(user => user.id === this.selectedUserId);
  }

  onSelectUser(id: string) {
    this.selectedUserId = id;
    console.log('Selected user with id:', id);
  }
}
