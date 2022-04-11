import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,
  FormControl,
  Validators,
  AbstractControl, } from '@angular/forms';

import { AuthService } from '../shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;

  constructor(private router: Router, private authService: AuthService) {}

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  get email(): AbstractControl {
    return this.userForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.userForm.get('password')!;
  }

  login(): void {
    if (this.userForm.invalid) {
      return;
    }

    const { email, password } =
      this.userForm.getRawValue();

    this.authService
      .login(email, password)
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
}
