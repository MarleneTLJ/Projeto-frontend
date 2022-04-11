import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

import { AuthService } from '../shared/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide = true;

  constructor(private router: Router, private authService: AuthService) {}

  passwordsMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.root.get('password');
    return password && control.value !== password.value
      ? {
          passwordMatch: true,
        }
      : null;
  }

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repeatPassword: new FormControl('', [
      Validators.required,
      this.passwordsMatchValidator,
    ]),
  });

  get name(): AbstractControl {
    return this.userForm.get('name')!;
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

  register(): void {
    if (this.userForm.invalid) {
      return;
    }

    const { name, email, password, repeatPassword } =
      this.userForm.getRawValue();

    this.authService
      .register(name, email, password, repeatPassword)
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
}
