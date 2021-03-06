// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];


if (environment.production) {
  enableProdMode();
  if (window ) {
    // tslint:disable-next-line:only-arrow-functions
    window.console.log =  function() {};
  }

}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
