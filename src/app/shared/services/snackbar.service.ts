import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SanackbarService {

  constructor(private sanckbar: MatSnackBar) { }

  snackbarNotify(menssagem: string) {
    this.sanckbar.open(menssagem, "Ok", { duration: 3000 });
  }
}
