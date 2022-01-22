import { Injectable } from '@angular/core';
import {Config} from '../class/config';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AccountService} from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private serviceAccount: AccountService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.serviceAccount.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate([Config.ROUTE_LOGIN], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}
