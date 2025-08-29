import { Routes } from '@angular/router';
import { HallListComponent } from './components/hall-list/hall-list';
import { BookingFormComponent } from './components/booking-form/booking-form';
import { DashboardComponent } from './components/dashboard/dashboard';
import { UserListComponent } from './components/user-list/user-list';
import { UserFormComponent } from './components/user-form/user-form';
import { UserDetailComponent } from './components/user-detail/user-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'halls', component: HallListComponent },
  { path: 'book', component: BookingFormComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/:id', component: UserDetailComponent }
];
