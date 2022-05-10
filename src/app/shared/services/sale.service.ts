import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Sale } from '../interfaces';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorage } from 'src/app/shared/services/auth/token.storage';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  token: string | null = this.tokenStorage.getToken() || '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': this.token!,
    }),
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {}

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

  getToken() {
    const token: string | null = this.tokenStorage.getToken() || '';
    const headers = new HttpHeaders({
      'auth-token': token,
    });
    return headers;
  }

  // Pega todos as compras
  getSales(): Observable<Sale[]> {
    return this.http
      .get<Sale[]>('http://localhost:3000/api/sales', {
        headers: this.getToken(),
      })
      .pipe(catchError(this.handleError));
  }

  // Pega uma compra pelo id
  getSale(id: string): Observable<Sale> {
    const url = `http://localhost:3000/api/sales/${id}`;

    return this.http
      .get<Sale>(url, { headers: this.getToken() })
      .pipe(catchError(this.handleError));
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
        type: string;
        area: string;
        price: number;
      }
    ],
    value_paid: number
  ): Observable<Sale> {
    return this.http
      .post<Sale>(
        'http://localhost:3000/api/sales',
        { client, courses, value_paid },
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  // Atualiza uma compra
  updateSale(sale: Sale): Observable<any> {
    const url = `http://localhost:3000/api/sales/${sale._id}`;

    return this.http
      .put(url, sale, this.httpOptions)
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
