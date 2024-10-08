import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  private _placeService = inject(PlacesService);
  _destroyRef = inject(DestroyRef);
  isFecthing = signal(false);
  places = this._placeService.loadedUserPlaces;
  ngOnInit(): void {
    this.isFecthing.update((val) => !val);

    const subscription = this._placeService.loadUserPlaces().subscribe({
      complete: () => {
        this.isFecthing.update((val) => !val);
      },
    });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  onSelectUserPlace(place: Place) {
    const subscription = this._placeService.removeUserPlace(place).subscribe();

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
