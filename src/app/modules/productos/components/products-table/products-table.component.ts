import { Component, Input, OnInit } from '@angular/core';
import { ListadoService } from '../../pages/listado/listado.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Productos } from 'src/app/core/interfaces/productos';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  public productos: Productos[] = [];
  public productosTmp: Productos[] = [];
  public cantidadRegistros: number[] = [5, 10, 20];
  public isLoading: boolean = true;
  public conteoRegistros: number[] = [];
  private seleccionInicial: number = this.cantidadRegistros[0];
  private cantidad!: number;

  constructor(private listadoService: ListadoService,
    private sharedService: SharedService) {}

  @Input()
  set filtrarProductos(value: string) {
    this.setProductos();
    if (this.productos.length) {
      if (value) {
        this.productos = this.productosTmp.filter(e => 
          e.name.toLowerCase().includes(value.toLowerCase()) || 
          e.description.toLowerCase().includes(value.toLowerCase())
        ).slice(0, this.seleccionInicial);
        return;
      }
    }
  }

  get cantidadResultados() {
    return this.productos.length;
  }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos() {
    this.isLoading = true;
    this.listadoService.getProducts().subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.isLoading = false;
          this.sharedService.showAlert('No existen registros');
          return;
        }
        this.conteoRegistros = data.map((o, i) => i).slice(0, this.seleccionInicial);
        setTimeout(() => {
          this.isLoading = false;
          this.productosTmp = data;
          this.setProductos();
        }, 500);
      },
      error: (error) => {
        this.isLoading = false;
        this.sharedService.showAlert(error);
      }
    });
  }

  seleccionarCantidadRegistros(event: Event) {
    const valor = (event.target as HTMLSelectElement).value;
    this.cantidad = Number(valor);
    this.seleccionInicial = this.cantidad;
    this.setProductos();
  }

  setProductos() {
    this.productos = this.productosTmp.slice(0, this.seleccionInicial);
  }

  validarURL(texto: string): boolean {
    const expresionRegular = /^(http|https):\/\/[^ "]+$/;
    return expresionRegular.test(texto);
  }
}
