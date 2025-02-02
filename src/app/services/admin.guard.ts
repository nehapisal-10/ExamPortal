import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  const router = inject(Router);

  if (login.isLoggedIn() && login.getUserRole() == 'ADMIN') {
    return true;
  } 
    router.navigate(['login']); // Redirect to an admin page or login page
    return false;
  
}
