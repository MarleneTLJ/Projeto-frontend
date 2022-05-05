import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ClientService } from 'src/app/shared/services';
import { Validacoes } from './validacoes.component';
import { DialogInfoSucesso } from 'src/app/dialogs/dialog-info/dialog-info.component';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss'],
})
export class ClientAddComponent {
  error: string | null = null;

  constructor(private clientService: ClientService, private location: Location, public dialog: MatDialog, private router: Router,) {}

  clientForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl(
      '',
      ([Validators.required, Validacoes.ValidaCpf])
    ),
  });

  get name(): AbstractControl {
    return this.clientForm.get('name')!;
  }

  get surname(): AbstractControl {
    return this.clientForm.get('surname')!;
  }

  get email(): AbstractControl {
    return this.clientForm.get('email')!;
  }

  get cpf(): AbstractControl {
    return this.clientForm.get('cpf')!;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogInfoSucesso);
    dialogRef.afterClosed().subscribe();
  }

  // Adiciona um cliente
  addClient(): void {
    // Se estiver incorreto os dados que o usuário inseriu, ele retorna nada
    if (this.clientForm.invalid) {
      return;
    }

    const { name, surname, email, cpf } =
      this.clientForm.getRawValue();

    this.clientService
      .addClient(name, surname, email, cpf)
      .subscribe({
        next: () => {
          this.openDialog();
          this.router.navigate(['/clients']);
        },
        // Pega o erro para jogar na tela
        error: () => {
          this.error = 'Um erro ocorreu!';
        },
      });
  }
}
