import { Component } from '@angular/core';
import { merge, Observable } from 'rxjs';

import { User } from './shared/interfaces';
import { AuthService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user$: Observable<User | null> = merge(
    // Atualiza após o login/cadastro/sair
    this.authService.getUser()
  );

  constructor(private authService: AuthService) { }
}
