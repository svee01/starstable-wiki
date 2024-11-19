import { Route } from '@angular/router';
import { UserOverviewComponent } from './user/user-overview.component';
import { UserDetailsComponent } from './user/user-details.component';

export const appRoutes: Route[] = [
  { path: 'users', component: UserOverviewComponent },
  { path: 'users/:id', component: UserDetailsComponent },
];
