import { Routes } from '@angular/router';
import { GridComponent } from './grid.component';
import { PaymentsComponent } from './payments.component';

export const routes: Routes = [
  { path: '', component: GridComponent },
  { path: 'payments', component: PaymentsComponent },
];
