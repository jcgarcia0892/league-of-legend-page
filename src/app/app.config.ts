import { ApplicationConfig } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { routes } from './app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { TemplatePageTitleStrategy } from './league-of-legends/services/title-strategy.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
  ]
};
