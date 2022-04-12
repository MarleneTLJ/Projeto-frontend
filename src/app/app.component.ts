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
  title = 'angular-auth';

  user$: Observable<User | null> = merge(
    // Inicia na inicialização
    this.authService.me(),
    // Atualiza após o login/cadastro/sair
    this.authService.getUser()
  );

  constructor(private authService: AuthService) { }
}
