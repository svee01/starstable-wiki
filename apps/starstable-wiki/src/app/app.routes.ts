import { Route } from '@angular/router';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const appRoutes: Route[] = [
  { path: 'users', component: UserOverviewComponent },
  { path: 'users/:id', component: UserDetailsComponent },
];
