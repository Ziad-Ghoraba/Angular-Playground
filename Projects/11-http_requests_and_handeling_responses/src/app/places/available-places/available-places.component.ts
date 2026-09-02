import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

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
  private placesServices = inject(PlacesService)
  private destroyRef = inject(DestroyRef);


  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placesServices.loadAvailablePlaces()
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

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
  }

  onSelectPlace(place: Place) {
    console.log(place);
    this.placesServices.addPlaceToUserPlaces(place).subscribe({
      next: (response) => {
        console.log('Place updated successfully:', response);
      },
      error: (err) => {
        console.error('Error updating place:', err);
      }
    });
  }
}
