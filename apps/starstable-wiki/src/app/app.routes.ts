import { Route } from '@angular/router';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  { path: 'users', component: UserOverviewComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '', component: HomeComponent },
];
