import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  actualDialog: MatDialogRef<any, any>;

  constructor(public dialog: MatDialog) { }

  openDialog(dialog: any, config?: any): void {
    this.actualDialog = this.dialog.open(dialog, config);
  }

  closeDialog(): void {
    if (this.actualDialog) {
      this.actualDialog.close();
    }
  }
}
