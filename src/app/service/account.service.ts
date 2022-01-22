import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Config} from '../class/config';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Account} from '../class/account';
import {FormLoginComponent} from '../form/form-login/form-login.component';
import {DialogService} from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountSource = new BehaviorSubject<Account>(undefined);
  public account: any = this.accountSource.asObservable();

  constructor(private serviceDialog: DialogService,
              private http: HttpClient,
              public jwtHelper: JwtHelperService) {
  }

  loadAccountInfos(): void {
    if (this.isLoggedIn()) {
      this.http.get(Config.URL_ACCOUNT_INFOS).subscribe((account: Account) => {
        this.setAccount(account);
      });
    }
  }

  login(id: string, password: string, success, failure): void {
    this.http.post<Account>(Config.URL_AUTH, {id, password}).subscribe((res) => {
      this.setSession(res.token);
      success(res);
    }, (error => {
      if (failure) {
        failure(error);
      }
    }));
  }

  updateAccount(account: Account, success, failure): void {
    if (this.isLoggedIn()) {
      this.http.patch<any>(Config.URL_ACCOUNT_UPDATE, {account}).subscribe((res) => {
        if (success) {
          success(res);
        }
      }, (error => {
        if (failure) {
          failure(error);
        }
      }));
    }
  }

  updateValue(field: string, oldValue: string, newValue: string, success, failure): void {
    if (this.isLoggedIn()) {
      this.http.patch<any>(Config.URL_ACCOUNT_UPDATE_FIELD.replace(':field', field), {oldValue, newValue}).subscribe((res) => {
        if (success) {
          success(res, oldValue, newValue);
        }
      }, (error => {
        if (failure) {
          failure(error, oldValue, newValue);
        }
      }));
    }
  }

  createAccount(account: Account, success, failure): void {
    this.http.post<any>(Config.URL_REGISTER, {account}).subscribe((res) => {
      if (success) {
        success(res);
      }
    }, (error => {
      if (failure) {
        failure(error);
      }
    }));
  }

  forgetPassword(email: string, success, failure): void {
    this.http.post(Config.URL_FORGET_PASSWORD, { email }).subscribe((res) => {
      if (success) {
        success(res);
      }
    }, (error => {
      if (failure) {
        failure(error);
      }
    }));
  }

  confirmAccount(token: string, success, failure): void {
    this.http.get(Config.URL_CONFIRM + '/' + token).subscribe((res) => {
      if (success) {
        success(res);
      }
    }, (error => {
      if (failure) {
        failure(error);
      }
    }));
  }

  resetPassword(token: string, password, success, failure): void {
    this.http.post(Config.URL_FORGET_PASSWORD_RESET,  {token, password}).subscribe((res) => {
      if (success) {
        success(res);
      }
    }, (error => {
      if (failure) {
        failure(error);
      }
    }));
  }

  private setSession(token): void {
    localStorage.setItem(Config.NAME_TOKEN_JWT, token);
  }

  refreshToken(): void {
    if (this.isLoggedIn()) {
      // this.http.post<Account>(Config.URL_AUTH_REFRESH, {}).subscribe((res) => {
      //   this.setSession(res);
      // }, (error => {
      // }));
    }
  }

  getToken(): string {
    return localStorage.getItem(Config.NAME_TOKEN_JWT);
  }

  logout(): void {
    localStorage.removeItem(Config.NAME_TOKEN_JWT);
  }

  public isLoggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired(localStorage.getItem(Config.NAME_TOKEN_JWT));
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getAccount(): any {
    return this.accountSource.asObservable();
  }

  setAccount(account: Account): void {
    this.accountSource.next(account);
  }
}
