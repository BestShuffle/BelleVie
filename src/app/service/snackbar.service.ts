import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InfoBarComponent} from '../component/info-bar/info-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(html: string): void {
    this.snackBar.openFromComponent(InfoBarComponent, {
      duration: 3 * 1000,
      // verticalPosition: 'top',
      panelClass: ['back-white'],
      data: {
        html
      }
    });
  }
}
