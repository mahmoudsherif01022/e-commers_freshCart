import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _id = inject(PLATFORM_ID);

  if (isPlatformBrowser(_id)) {
    if (localStorage.getItem('userToken') !== null) {
      return true;
    } else {
      _router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }
};
