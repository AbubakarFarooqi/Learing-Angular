import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';

export const appConfig: ApplicationConfig = {
  providers: [
    StarRatingConfigService,
    // importProvidersFrom(StarRatingModule),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ),
  ],
};
