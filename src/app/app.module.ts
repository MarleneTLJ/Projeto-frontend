import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';

import { SharedModule } from './shared/shared.module';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { AppComponent } from './app.component';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { DialogCompra } from './dialogs/dialog-compra/dialog-compra.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {
  DialogInfoSucesso,
  DialogInfoConf,
} from './dialogs/dialog-info/dialog-info.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseDetailComponent } from './pages/courses/course-detail/course-detail.component';
import { CourseAddComponent } from './pages/courses/course-add/course-add.component';
import { AuthService } from './shared/services';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientAddComponent } from './pages/clients/client-add/client-add.component';
import { ClientDetailComponent } from './pages/clients/client-detail/client-detail.component';

export function appInitializerFactory(authService: AuthService) {
  return () => authService.checkTheUserOnTheFirstLoad();
}

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    NgIdleKeepaliveModule.forRoot(),
    NgxMaskModule.forRoot(maskConfigFunction)
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DialogCompra,
    DialogInfoSucesso,
    DialogInfoConf,
    CoursesComponent,
    CourseDetailComponent,
    CourseAddComponent,
    ClientsComponent,
    ClientAddComponent,
    ClientDetailComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
