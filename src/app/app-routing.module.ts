import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseDetailComponent } from './pages/courses/course-detail/course-detail.component';
import { CourseAddComponent } from './pages/courses/course-add/course-add.component';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course-detail/:id',
    component: CourseDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course-add',
    component: CourseAddComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
