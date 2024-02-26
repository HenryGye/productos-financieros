import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from 'src/app/core/interfaces/productos';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent {
  @Input() producto!: Productos;

  constructor(private router: Router,
    private sharedService: SharedService) {}
  
  editar() {
    this.router.navigate(['productos/editar', this.producto.id], { state: { producto: this.producto } });
  }

  eliminar() {
    this.sharedService.showModal(this.producto);
  }
}
