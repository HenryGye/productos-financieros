import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {
  public filtroProducto!: string;

  constructor(private router: Router) {}

  busquedaProductos(dato: string) {
    this.filtroProducto = dato;
  }

  crear() {
    this.router.navigate(['productos/crear']);
  }
}
