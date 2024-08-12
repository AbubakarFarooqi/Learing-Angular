import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    StarRatingConfigService,

    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(),
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
