import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  // Isso evita que um usuário não logado acesse a página de cadastro
  canActivate(): Observable<boolean> {
    return this.authService.getUser().pipe(
      map(user => {
        if (user) {
          return true;
        }
        this.router.navigateByUrl('');
        return false;
      })
    );
  }
}
