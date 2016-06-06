import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import {OVERLAY_PROVIDERS} from "@angular2-material/core/overlay/overlay";
import { KumparanNg2AppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(KumparanNg2AppComponent, [OVERLAY_PROVIDERS]);