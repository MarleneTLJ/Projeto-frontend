import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Client } from 'src/app/shared/interfaces';
import { ClientService } from 'src/app/shared/services';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  client: Client | undefined;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getClient();
  }

  getClient(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.clientService
      .getClient(id)
      .subscribe((client) => (this.client = client));
  }

  goBack(): void {
    this.location.back();
  }

  saveClient(): void {
    if (this.client) {
      this.clientService
        .updateClient(this.client)
        .subscribe(() => this.goBack());
    }
  }

}
