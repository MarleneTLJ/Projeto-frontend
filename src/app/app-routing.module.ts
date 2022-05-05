import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseDetailComponent } from './pages/courses/course-detail/course-detail.component';
import { CourseAddComponent } from './pages/courses/course-add/course-add.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientAddComponent } from './pages/clients/client-add/client-add.component';
import { ClientDetailComponent } from './pages/clients/client-detail/client-detail.component';
import { SalesComponent } from './pages/sales/sales.component';
import { SaleAddComponent } from './pages/sales/sale-add/sale-add.component';
import { SalePdfComponent } from './pages/sales/sale-pdf/sale-pdf.component';
import { SaleDetailComponent } from './pages/sales/sale-detail/sale-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'course-detail/:id',
    component: CourseDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'course-add',
    component: CourseAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'client-detail/:id',
    component: ClientDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'client-add',
    component: ClientAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sales',
    component: SalesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sale-detail/:id',
    component: SaleDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sale-add',
    component: SaleAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sale-pdf/:id',
    component: SalePdfComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
