import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AccountService} from './account.service';
import {Config} from '../class/config';
import {NavbarService} from './navbar.service';

@Injectable({
  providedIn: 'root'
})
export class DataGuardService implements CanActivate {

  constructor(private serviceNavbar: NavbarService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.serviceNavbar.setNavbarTransparent(route.data.navbarTransparent);
    return true;
  }
}
