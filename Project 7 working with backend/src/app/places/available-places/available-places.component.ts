import { Component, inject, signal,OnInit, DestroyRef } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';

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
    const subscription = this._httpCLient.get("http://localhost:3000/places").subscribe({
      next: (resData)=>{
          console.dir(resData)
      }
    })
    this._destroyRef.onDestroy(()=>{
      subscription.unsubscribe()
    })
  }

  places = signal<Place[] | undefined>(undefined);
}
