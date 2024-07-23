import { Component } from '@angular/core';
import { SafeLinkActiveDirective } from '../safe-link-active.directive';

@Component({
  selector: 'app-learning-resources',
  templateUrl: './learning-resources.component.html',
  styleUrl: './learning-resources.component.css',
  standalone: true,
  imports:[SafeLinkActiveDirective]
})
export class LearningResourcesComponent {}
