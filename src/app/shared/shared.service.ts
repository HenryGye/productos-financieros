import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Productos } from '../core/interfaces/productos';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private alertSubject: Subject<string | null> = new Subject<string | null>();
  private modalSubject: Subject<Productos | null> = new Subject<Productos | null>();

  constructor() { }

  getAlert(): Observable<string | null> {
    return this.alertSubject.asObservable();
  }

  showAlert(message: string): void {
    this.alertSubject.next(message);
  }

  clearAlert(): void {
    this.alertSubject.next(null);
  }

  getProductoModal(): Observable<Productos | null> {
    return this.modalSubject.asObservable();
  }

  showModal(producto: Productos): void {
    this.modalSubject.next(producto);
  }

  hideModal(): void {
    this.modalSubject.next(null);
  }
}
