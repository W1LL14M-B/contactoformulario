import { Routes } from '@angular/router';
import { ContactComponent } from './ui/contact/contact.component';
import { ContactTableComponent } from './ui/contact-table/contact-table.component';

export const routes: Routes = [


    { path: '', component: ContactComponent },
    { path: 'tabla', component: ContactTableComponent }
];
