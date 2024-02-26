import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HTTP_STATUS_CODES } from 'src/app/core/constants/http-status-codes.constant';
import { Productos } from 'src/app/core/interfaces/productos';
import { environment } from 'src/environments/environment.development';

const URL_BASE = environment.URL_BASE;
const AUTHOR_ID = environment.AUTHOR_ID;

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  constructor(private http: HttpClient) { }

  createHeader() {
    let headers: HttpHeaders;
      headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Accept', 'application/json; charset=utf-8')
      .set('Access-Control-Allow-Origin', '*')
      .set('authorId', AUTHOR_ID);
      return headers;
  }

  verifyProducts(id: string): Observable<boolean> {
    const headers = this.createHeader();
    let params = new HttpParams()
      .append('id', id);

    return this.http.get<boolean>(`${URL_BASE}/bp/products/verification`, { headers, params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HTTP_STATUS_CODES.BAD_REQUEST) {
            return throwError(error.error);
          } else {
            return throwError('Ha ocurrido un error. Vuelva a intentar.');
          }
        })
      );
  }

  postProducts(body: Productos): Observable<Productos> {
    const headers = this.createHeader();

    return this.http.post<Productos>(`${URL_BASE}/bp/products`, body, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HTTP_STATUS_CODES.BAD_REQUEST) {
            return throwError(error.error);
          } else {
            return throwError('Ha ocurrido un error. Vuelva a intentar.');
          }
        })
      );
  }

  putProducts(body: Productos): Observable<Productos> {
    const headers = this.createHeader();

    return this.http.put<Productos>(`${URL_BASE}/bp/products`, body, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HTTP_STATUS_CODES.BAD_REQUEST || error.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
            return throwError(error.error);
          } else {
            return throwError('Ha ocurrido un error. Vuelva a intentar.');
          }
        })
      );
  }
}
