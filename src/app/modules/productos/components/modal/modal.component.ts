import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Productos } from 'src/app/core/interfaces/productos';
import { SharedService } from 'src/app/shared/shared.service';
import { ListadoService } from '../../pages/listado/listado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  public texto: string | undefined;
  public producto!: Productos | null;
  private subscription = new Subscription;

  constructor(private sharedService: SharedService,
    private listadoService: ListadoService,
    private router: Router) {}
  
  ngOnInit(): void {
    this.subscription = this.sharedService.getProductoModal().subscribe(producto => {
      this.producto = producto;
      this.texto = this.producto?.name;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ocultar() {
    this.sharedService.hideModal();
  }

  eliminar() {
    this.listadoService.deleteProducts(this.producto?.id as string).subscribe({
      next: (data) => {
        this.sharedService.showAlert('Producto eliminado exitósamente');
        this.sharedService.hideModal();
        // this.router.navigate(['/']);
        
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      },
      error: (error) => {
        this.sharedService.showAlert(error);
        this.sharedService.hideModal();
      }
    });
  }
}
