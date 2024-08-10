import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [ReactiveFormsModule],
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchForm = new FormGroup({
    searchInput: new FormControl('', [Validators.required]),
  });
  onSearch() {
    if (this.searchForm.invalid) {
      return;
    }
    // Implement Search logic here in future
    this.searchForm.reset();
  }
}
