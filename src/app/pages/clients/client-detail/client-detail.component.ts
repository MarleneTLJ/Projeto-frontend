import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    private clientService: ClientService,
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

  saveClient(): void {
    if (this.client) {
      this.clientService
        .updateClient(this.client)
        .subscribe(() => this.router.navigate(['/clients']));
    }
  }

}
