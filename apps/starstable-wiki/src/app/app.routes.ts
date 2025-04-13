import { Route } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { UserOverviewComponent } from './user/user-overview/user-overview.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { HorseOverviewComponent } from './horse/horse-overview/horse-overview.component';
import { HorseDetailsComponent } from './horse/horse-details/horse-details.component';
import { HorseFormComponent } from './horse/horse-form/horse-form.component';
import { CharacterOverviewComponent } from './character/character-overview/character-overview.component';
import { CharacterDetailsComponent } from './character/character-details/character-details.component';
import { CharacterFormComponent } from './character/character-form/character-form.component';
import { StableOverviewComponent } from './stable/stable-overview/stable-overview.component';
import { StableDetailsComponent } from './stable/stable-details/stable-details.component';
import { StableFormComponent } from './stable/stable-form/stable-form.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'login', component: LoginComponent },

  { path: 'users', component: UserOverviewComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },
  { path: 'user-form', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'user-form/:id', component: UserFormComponent, canActivate: [AuthGuard] },

  { path: 'horses', component: HorseOverviewComponent, canActivate: [AuthGuard] },
  { path: 'horses/:id', component: HorseDetailsComponent, canActivate: [AuthGuard] },
  { path: 'horse-form', component: HorseFormComponent, canActivate: [AuthGuard] },
  { path: 'horse-form/:id', component: HorseFormComponent, canActivate: [AuthGuard] },

  { path: 'characters', component: CharacterOverviewComponent, canActivate: [AuthGuard] },
  { path: 'characters/:id', component: CharacterDetailsComponent, canActivate: [AuthGuard] },
  { path: 'character-form', component: CharacterFormComponent, canActivate: [AuthGuard] },
  { path: 'character-form/:id', component: CharacterFormComponent, canActivate: [AuthGuard] },

  { path: 'stables', component: StableOverviewComponent, canActivate: [AuthGuard] },
  { path: 'stables/:id', component: StableDetailsComponent, canActivate: [AuthGuard] },
  { path: 'stable-form', component: StableFormComponent, canActivate: [AuthGuard] },
  { path: 'stable-form/:id', component: StableFormComponent, canActivate: [AuthGuard] },
];
