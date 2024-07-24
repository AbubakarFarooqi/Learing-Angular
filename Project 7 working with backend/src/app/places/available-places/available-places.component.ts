import { Component, inject, signal,OnInit, DestroyRef } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  _httpCLient = inject(HttpClient)
  _destroyRef = inject(DestroyRef)
  ngOnInit(): void {
    const subscription = this._httpCLient.get<{places:Place[]}>("http://localhost:3000/places").pipe(
      map((resData) => resData.places) 
    )
    .subscribe({
      next: (places)=>{
        this.places.set(places) 
      }
    })
    this._destroyRef.onDestroy(()=>{
      subscription.unsubscribe()
    })
  }

  places = signal<Place[] | undefined>(undefined);
}
