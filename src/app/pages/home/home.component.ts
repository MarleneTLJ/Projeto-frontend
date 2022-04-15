import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCompra } from '../../dialogs/dialog-compra/dialog-compra.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogCompra);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
