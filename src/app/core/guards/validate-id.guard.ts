import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class validateIdGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const id = next.paramMap.get('id');
    if (!id || !/^\d+$/.test(id)) {
      this.router.navigate(['/productos/crear']);
      return false;
    }
    return true;
  }
}
