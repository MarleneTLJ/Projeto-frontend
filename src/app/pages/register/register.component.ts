import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../shared/services';
import { DialogInfoSucesso } from '../../dialogs/dialog-info/dialog-info.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  error: string | null = null;
  hide1 = true;
  hide2 = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  passwordsMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.root.get('password');
    return password && control.value !== password.value
      ? {
          passwordMatch: true,
        }
      : null;
  }

  // Form de validações para evitar que o usuário envie dados inválidos
  userForm = new FormGroup({
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
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
      this.passwordsMatchValidator,
    ]),
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

  get password(): AbstractControl {
    return this.userForm.get('password')!;
  }

  get repeatPassword(): AbstractControl {
    return this.userForm.get('repeatPassword')!;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogInfoSucesso);

    dialogRef.afterClosed().subscribe();
  }

  register(): void {
    // Se estiver incorreto os dados que o usuário inseriu, ele retorna nada
    if (this.userForm.invalid) {
      return;
    }

    const { name, surname, email, password, repeatPassword } =
      this.userForm.getRawValue();

    this.authService
      .register(name, surname, email, password, repeatPassword)
      .subscribe({
        // Se estiver tudo correto, ele leva o usuário até a home page
        next: () => {
          this.openDialog();
          this.router.navigate(['']);
        },
        // Pega o erro para jogar na tela
        error: () => {
          this.error = 'Este e-mail já existe!';
        },
      });
  }
}
