import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Client } from 'src/app/shared/interfaces';
import { ClientService } from 'src/app/shared/services';
import { DialogInfoConf } from '../../dialogs/dialog-info/dialog-info.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getClients();
  }

  // Dialogo/modal de confirmação de exclusão do cliente
  openDialog(client: Client) {
    const dialogRef = this.dialog.open(DialogInfoConf);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteClient(client);
      }
    });
  }

  // Pega todos os clientes
  getClients(): void {
    this.clientService
      .getClients()
      .subscribe((clients) => (this.clients = clients));
  }

  // Deleta um cliente
  deleteClient(client: Client): void {
    this.clients = this.clients.filter((c) => c !== client);
    this.clientService.deleteClient(client._id).subscribe();
  }
}
