/** The below allows Production Mode to be entered on device*/
import { enableProdMode } from '@angular/core';

/** imports platform-browser-dynamic web applications module*/
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/** Initiates App interface module and runtime environment*/
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/** Ensures that prouction mode is either entered or that the error will be caught by the console */
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
