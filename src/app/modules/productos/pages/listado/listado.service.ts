import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { HTTP_STATUS_CODES } from 'src/app/core/constants/http-status-codes.constant';
import { Productos } from 'src/app/core/interfaces/productos';
import { Result } from 'src/app/core/interfaces/result';
import { environment } from 'src/environments/environment.development';

const URL_BASE = environment.URL_BASE;
const AUTHOR_ID = environment.AUTHOR_ID;

@Injectable({
  providedIn: 'root'
})
export class ListadoService {

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

  getProducts(): Observable<Productos[]> {
    const headers = this.createHeader();
    return this.http.get<Productos[]>(`${URL_BASE}/bp/products`, { headers })
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

  deleteProducts(id: string): Observable<any> {
    const headers = this.createHeader();
    let params = new HttpParams()
      .append('id', id);

    return this.http.delete<any>(`${URL_BASE}/bp/products`, { headers, params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HTTP_STATUS_CODES.BAD_REQUEST || error.status === HTTP_STATUS_CODES.NOT_FOUND) {
            return throwError(error.error);
          } else if (error.status === HTTP_STATUS_CODES.OK) {
            return of(HTTP_STATUS_CODES.OK);
          } else {
            return throwError('Ha ocurrido un error. Vuelva a intentar.');
          }
        })
      );
  }
}
