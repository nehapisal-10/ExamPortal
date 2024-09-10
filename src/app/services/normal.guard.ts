import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const normalGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  const router = inject(Router);

  if (login.isLoggedIn() && login.getUserRole() == 'NORMAL') {
    return true;
  } else {
    router.navigate(['user-dashboard']); // Redirect to an user page or login page
    return false;
  }
};
