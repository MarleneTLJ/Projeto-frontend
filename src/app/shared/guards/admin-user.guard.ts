import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { map } from 'rxjs/operators';

import { AuthService } from '../services';
import { DialogRotaInvalida } from 'src/app/dialogs/dialog-info/dialog-info.component';

@Injectable({ providedIn: 'root' })
export class OnlyAdminUsersGuard implements CanActivate {
  constructor(private authService: AuthService, private location: Location, public dialog: MatDialog) {}

  goBack(): void {
    this.location.back();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogRotaInvalida);

    dialogRef.afterClosed().subscribe(() => {
        this.goBack();
    });
  }

  canActivate() {
    return this.authService.getUser().pipe(map(user => {
      if (user !== null && user!.roles.admin === true) {
        return true;
      }
      this.openDialog();
      return false;
    }));
  }
}
