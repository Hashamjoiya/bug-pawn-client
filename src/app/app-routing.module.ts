import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) }, { path: 'issues', loadChildren: () => import('./modules/issues/issues.module').then(m => m.IssuesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
