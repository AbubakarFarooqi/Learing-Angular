import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();
  private _httpCLient = inject(HttpClient);

  private fetchPlaces(url: string) {
    return this._httpCLient
      .get<{ places: Place[] }>(url)
      .pipe(map((resData) => resData.places));
  }
  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places');
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places');
  }

  addPlaceToUserPlaces(place: Place) {
    return this._httpCLient.put('http://localhost:3000/user-places', {
      placeId: place.id,
    });
  }

  removeUserPlace(place: Place) {}
}
