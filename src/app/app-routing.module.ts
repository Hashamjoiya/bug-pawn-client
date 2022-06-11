import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { GuestGuard } from './services/auth/guest.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule), canActivate: [GuestGuard], canLoad: [GuestGuard] },
  { path: '', pathMatch: 'full', loadChildren: () => import('./modules/issues/issues.module').then(m => m.IssuesModule), canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
