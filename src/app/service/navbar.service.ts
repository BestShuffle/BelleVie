import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private navbarTransparentSource = new BehaviorSubject<boolean>(true);
  public navbarTransparent: any = this.navbarTransparentSource.asObservable();

  constructor() {}

  isNavbarTransparent(): any {
    return this.navbarTransparentSource.asObservable();
  }

  setNavbarTransparent(isNavbarTransparent: boolean): void {
    this.navbarTransparentSource.next(isNavbarTransparent);
  }
}
