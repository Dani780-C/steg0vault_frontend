import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('token')) {
    const userService = inject(UserService);
    let token = getUser(localStorage.getItem('token'));
    return route.data['role'] === token.role
  } else {
    const router = inject(Router);
    return router.navigate(['login']);
  }
};

export const getUser:any = (token: string) => {
  return JSON.parse(atob(token.split('.')[1]))
}