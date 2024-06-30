import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./components/user-account/user-account.module').then(m => m.UserAccountModule),
    canActivate: [authGuard],
    data: {
      role: 'USER'
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard],
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./components/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./components/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: '**',
    loadChildren: () => import('./components/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
