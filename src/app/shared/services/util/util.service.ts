import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, { duration: 2500 });
  }
}
