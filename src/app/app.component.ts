import { Component } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';

import { User } from './shared/interfaces';
import { AuthService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date;

  user$: Observable<User | null> = merge(
    // Init on startup
    this.authService.me(),
    // Atualiza após o login/cadastro/sair
    this.authService.getUser()
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private idle: Idle,
    private keepalive: Keepalive
  ) {
    // Coloca um idle timout de 10 minutos
    idle.setIdle(600);
    // Coloca um período de timout de 10 segundos, e após isso, o usuário é deslogado automaticamente
    idle.setTimeout(10);
    // Coloca sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      this.authService.signOut();
      this.router.navigate(['']);
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
      console.log(this.idleState);
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      console.log(this.idleState);
    });

    // Coloca o ping em um intervalo de ?? minutos
    keepalive.interval(60);

    keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    this.authService.getUser().subscribe((userLoggedIn) => {
      if (userLoggedIn) {
        idle.watch();
        this.timedOut = false;
      } else {
        idle.stop();
      }
    });
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}
