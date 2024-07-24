import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  _placeService = inject(PlacesService);
  _destroyRef = inject(DestroyRef);
  places = signal<Place[] | undefined>(undefined);
  isFecthing = signal(false);

  ngOnInit(): void {
    this.isFecthing.update((val) => !val);
    const subscription = this._placeService.loadAvailablePlaces().subscribe({
      next: (places) => {
        this.places.set(places);
      },
      complete: () => {
        this.isFecthing.update((val) => !val);
      },
    });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(place: Place) {
    this._placeService.addPlaceToUserPlaces(place).subscribe();
  }
}
