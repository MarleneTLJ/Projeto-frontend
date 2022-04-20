import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { AuthService } from '../../shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  error: string | null = null;
  hide = true;

  constructor(private router: Router, private authService: AuthService) {}

  // Form de validações para evitar que o usuário envie dados inválidos
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get email(): AbstractControl {
    return this.userForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.userForm.get('password')!;
  }

  login(): void {
    // Se estiver incorreto os dados que o usuário inseriu, ele retorna nada
    if (this.userForm.invalid) {
      return;
    }

    const { email, password } = this.userForm.getRawValue();

    this.authService.login(email, password).subscribe({
      // Se estiver tudo correto, ele leva o usuário até a home page
      next: () => {
        this.router.navigate(['']);
      },
      // Pega o erro para jogar na tela
      error: () => {
        this.error = 'E-mail ou senha inválido!';
      }
    });
  }
}
