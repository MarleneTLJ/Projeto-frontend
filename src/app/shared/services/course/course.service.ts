import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Course } from '../../interfaces';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  // Pega todos os cursos
  getCourses(): Observable<Course[]> {
    return this.http
      .get<Course[]>('http://localhost:3000/api/courses')
      .pipe(catchError(this.handleError));
  }

  // Pega um curso pelo id
  getCourse(id: string): Observable<Course> {
    const url = `http://localhost:3000/api/courses/${id}`;

    return this.http.get<Course>(url).pipe(catchError(this.handleError));
  }

  // Adiciona um curso
  addCourse(
    title: string,
    workload: number,
    price: string,
    description: string
  ): Observable<Course> {
    return this.http
      .post<Course>(
        'http://localhost:3000/api/courses',
        { title, workload, price, description },
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  // Atualiza um curso
  updateCourse(course: Course): Observable<any> {
    const url = `http://localhost:3000/api/courses/${course._id}`;

    return this.http
      .put(url, course, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Deleta um curso
  deleteCourse(id: string): Observable<Course> {
    const url = `http://localhost:3000/api/courses/${id}`;

    return this.http
      .delete<Course>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
