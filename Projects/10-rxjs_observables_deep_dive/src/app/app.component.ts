import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import {interval, Observable, take} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent  {
  clickCount = signal(0);
  // clickCount$ = toObservable(this.clickCount);
  customInterval$ = new Observable((subscriber) =>
  {
    let timeExecuted = 0;
    const interval = setInterval(() => {
      // subscriber.error();
      if (timeExecuted > 5) {
        subscriber.complete();
        clearInterval(interval);
        return;
      }
      console.log(`custom interval executed ${timeExecuted} times`);
      subscriber.next(timeExecuted);
      timeExecuted++;
      }, 1000);
      return () => {
      clearInterval(interval);
    };
  });

  customIntervalSubscription = this.customInterval$.subscribe({
    next: (value) => console.log(value),
    complete: () => console.log('custom interval completed'),
    error: (err) => console.error('custom interval error:', err)
  });


  // private destroyRef = inject(DestroyRef);
  // constructor() {
  //   effect(() => {
  //     console.log(`Click count: ${this.clickCount()}`);
  //   });
  // }

  // ngOnInit(): void {
  //   const subscription = interval(1000).pipe(take(5)).subscribe({
  //     next:() => console.log('tick'),
  //     complete:() => console.log('complete')
  //   });
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });

  //   this.clickCount$.subscribe({
  //     next: (count) => console.log(`Click count from observable: ${count}`),
  //     complete: () => console.log('Click count observable completed')
  //   });
  // }
  onClick() {
    // this.clickCount.update((count) => count + 1);
  }
}
