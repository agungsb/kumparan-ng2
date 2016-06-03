import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { KumparanNg2AppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(KumparanNg2AppComponent);

