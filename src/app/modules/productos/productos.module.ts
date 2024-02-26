import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosRoutingModule } from './productos-routing.module';
import { RouterModule } from '@angular/router';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent,
    SearchBoxComponent,
    ProductsTableComponent,
    DropDownComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProductosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class ProductosModule { }
