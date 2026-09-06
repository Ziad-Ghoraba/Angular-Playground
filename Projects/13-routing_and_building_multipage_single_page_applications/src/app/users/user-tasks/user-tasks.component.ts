import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  userName = signal<string>('');

  // userName = computed(() => {
  //   const user = this.usersService.users.find(
  //     (user) => user.id === this.userId()
  //   );
  //   return user ? user.name : '';
  // });

  ngOnInit(): void {
    const subscription = this.activatedRoute.params.subscribe({
      next: (params) => this.usersService.users.find((user) => {
        if (user.id === params['userId']) {
          this.userName.set(user.name);
        }
      })
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
