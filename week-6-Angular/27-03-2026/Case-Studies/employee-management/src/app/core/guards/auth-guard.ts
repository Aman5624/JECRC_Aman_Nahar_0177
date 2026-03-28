import { CanActivateFn, Router } from '@angular/router';
import { Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const auth = Inject(AuthService);
  const router = Inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }
  else {
    router.navigate(['/login']);
    return false;
  }
};
