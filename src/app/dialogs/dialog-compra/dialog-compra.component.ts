import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Validacoes } from '../../pages/clients/client-add/validacoes.component';

@Component({
  selector: 'dialog-compra',
  templateUrl: 'dialog-compra.html',
  styleUrls: ['./dialog.component.scss'],
})

export class DialogCompra {

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl('', Validators.compose([Validators.required, Validacoes.ValidaCpf]))
  });

  get name(): AbstractControl {
    return this.userForm.get('name')!;
  }

  get surname(): AbstractControl {
    return this.userForm.get('surname')!;
  }

  get email(): AbstractControl {
    return this.userForm.get('email')!;
  }

  get cpf(): AbstractControl {
    return this.userForm.get('cpf')!;
  }
}
