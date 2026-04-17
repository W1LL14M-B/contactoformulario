import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { ContactRepository } from './app/domain/ports/contact.repository';
import { ContactRepositoryImpl } from './app/infrastructure/repositories/contact.repository.impl';

/* bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); */


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
       {
      provide: ContactRepository,
      useClass: ContactRepositoryImpl
    }
  ]
});
