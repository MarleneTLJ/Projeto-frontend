import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Sale } from 'src/app/shared/interfaces';
import { SaleService } from '../../shared/services';
import { DialogInfoConf } from '../../dialogs/dialog-info/dialog-info.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  sales: Sale[] = [];

  constructor(private saleService: SaleService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getSales();
  }

  // Pega todos as compras
  getSales(): void {
    this.saleService.getSales().subscribe((sales) => (this.sales = sales));
  }

  // Dialogo/modal de confirmação de exclusão da compra
  openDialog(sale: Sale) {
    const dialogRef = this.dialog.open(DialogInfoConf);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.deleteSale(sale);
      }
    });
  }

  // Deleta uma compra
  deleteSale(sale: Sale): void {
    this.sales = this.sales.filter((c) => c !== sale);
    this.saleService.deleteSale(sale._id).subscribe();
  }
}
