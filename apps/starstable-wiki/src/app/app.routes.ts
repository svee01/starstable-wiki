import { Route } from '@angular/router';
import { UserOverviewComponent } from './user/user-overview/user-overview.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user/user-form/user-form.component';

export const appRoutes: Route[] = [
  { path: 'users', component: UserOverviewComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '', component: HomeComponent },
  { path: 'user-form', component: UserFormComponent },
];
