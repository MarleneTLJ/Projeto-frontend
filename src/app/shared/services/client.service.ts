import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Client } from '../interfaces';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
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

  // Pega todos os clientes
  getClients(): Observable<Client[]> {
    return this.http
      .get<Client[]>('http://localhost:3000/api/clients')
      .pipe(catchError(this.handleError));
  }

  // Pega um cliente pelo id
  getClient(id: string): Observable<Client> {
    const url = `http://localhost:3000/api/clients/${id}`;

    return this.http.get<Client>(url).pipe(catchError(this.handleError));
  }

  // Adiciona um cliente
  addClient(
    name: string,
    surname: number,
    email: string,
    cpf: number
  ): Observable<Client> {
    return this.http
      .post<Client>(
        'http://localhost:3000/api/clients',
        { name, surname, email, cpf },
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  // Atualiza um cliente
  updateClient(client: Client): Observable<any> {
    const url = `http://localhost:3000/api/clients/${client._id}`;

    return this.http
      .put(url, client, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Deleta um cliente
  deleteClient(id: string): Observable<Client> {
    const url = `http://localhost:3000/api/clients/${id}`;

    return this.http
      .delete<Client>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
