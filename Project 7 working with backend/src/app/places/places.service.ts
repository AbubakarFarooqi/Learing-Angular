import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { map, pipe, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private _errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();
  private _httpCLient = inject(HttpClient);

  private fetchPlaces(url: string) {
    return this._httpCLient
      .get<{ places: Place[] }>(url)
      .pipe(map((resData) => resData.places));
  }
  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places').pipe(
      tap({
        error: () => {
          this._errorService.showError(
            'Something wenrt wrong while loading avaible places'
          );
        },
      })
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places').pipe(
      tap({
        next: (userPlaces) => {
          this.userPlaces.set(userPlaces);
        },
        error: () => {
          this._errorService.showError(
            'Something wenrt wrong while loading user places'
          );
        },
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();
    if (!this.userPlaces().some((p) => p.id === place.id)) {
      this.userPlaces.update((places) => {
        return [...places, place];
      });
    }

    return this._httpCLient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        tap({
          error: () => {
            this.userPlaces.set(prevPlaces);
            this._errorService.showError(
              'Something wenrt wrong while loading user places'
            );
          },
        })
      );
  }

  removeUserPlace(place: Place) {}
}
