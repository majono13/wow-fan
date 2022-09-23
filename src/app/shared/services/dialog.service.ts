import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/admin/admin/dialog/dialog.component';
@Injectable({
  providedIn: 'root'
})
export class Dialog {

  constructor(public dialog: MatDialog) { }

  openDialog(msg: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: msg,
    });

  }
}
