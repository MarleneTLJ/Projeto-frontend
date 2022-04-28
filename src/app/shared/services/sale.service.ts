import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Sale } from '../interfaces';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
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

  // Pega todos as compras
  getSales(): Observable<Sale[]> {
    return this.http
      .get<Sale[]>('http://localhost:3000/api/sales')
      .pipe(catchError(this.handleError));
  }

  // Pega uma compra pelo id
  getSale(id: string): Observable<Sale> {
    const url = `http://localhost:3000/api/sales/${id}`;

    return this.http.get<Sale>(url).pipe(catchError(this.handleError));
  }

  // Adiciona uma compra
  addSale(
    client: {
      name: string;
      surname: number;
      email: string;
      cpf: number;
    },
    courses: [
      {
        title: string;
        workload: number;
        price: number;
        description: string;
      }
    ],
    value_paid: number
  ): Observable<Sale> {
    return this.http
      .post<Sale>('http://localhost:3000/api/sales', { client, courses, value_paid }, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Deleta uma compra
  deleteSale(id: string): Observable<Sale> {
    const url = `http://localhost:3000/api/sales/${id}`;

    return this.http
      .delete<Sale>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
