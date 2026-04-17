import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ContactRepository } from './domain/ports/contact.repository';
import { ContactRepositoryImpl } from './infrastructure/repositories/contact.repository.impl';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),




   ]

};
