import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { HttpClient } from '@angular/common/http';
import { Place } from '../place.model';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  isFetching = signal<boolean>(false);
  error = signal<string>('');
  private destroyRef = inject(DestroyRef);
  private placesServices = inject(PlacesService)
  places = this.placesServices.loadedUserPlaces;

   ngOnInit() {
     this.isFetching.set(true);
      const subscription = this.placesServices.loadUserPlaces()
       .subscribe({
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

   onDeletePlace(place: Place) {
     const subscription = this.placesServices.removeUserPlace(place).subscribe();

      this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      });
   }

}
