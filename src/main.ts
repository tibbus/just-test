import './polyfills.ts';

import 'rxjs/Rx';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

//enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);