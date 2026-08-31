import { Component, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal<boolean>(false);
  error = signal<string>('');
  private httpClient = inject(HttpClient);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<{places: Place[]}>('http://localhost:3000/places')
      .pipe(
        map((responseData) => responseData.places), catchError((errorRes) => throwError(() => new Error('Failed to fetch places. Please try again later.')))
      )
      .subscribe({
        next: (places) => {
          console.log(places);
          this.places.set(places);
        },
        complete: () => {
          this.isFetching.set(false);
          subscription.unsubscribe();
        },
        error: (err: Error) => {
          this.error.set(err.message);
          console.error(err);
        }
      });
  }
}
