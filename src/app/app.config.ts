import {NG_EVENT_PLUGINS} from "@taiga-ui/event-plugins";
import {provideAnimations} from "@angular/platform-browser/animations";
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, Routes} from '@angular/router';

import {routes} from './app.routes';
import {AppComponent} from './app.component';
import {RegisterComponent} from './register.component';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), NG_EVENT_PLUGINS]
};
