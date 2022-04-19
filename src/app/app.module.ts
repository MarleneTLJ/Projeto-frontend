import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
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
  DialogInfoFalha,
} from './dialogs/dialog-info/dialog-info.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseDetailComponent } from './pages/courses/course-detail/course-detail.component';
import { CourseAddComponent } from './pages/courses/course-add/course-add.component';

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
    DialogInfoFalha,
    CoursesComponent,
    CourseDetailComponent,
    CourseAddComponent,
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
      provide: LOCALE_ID,
      useValue: "pt-BR"
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
