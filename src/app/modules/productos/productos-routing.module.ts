import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { validateIdGuard } from 'src/app/core/guards/validate-id.guard';
import { ErrorPageComponent } from 'src/app/shared/components/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: ListadoComponent,
  },
  {
    path: 'crear',
    component: FormularioComponent,
  },
  {
    path: 'editar/:id',
    component: FormularioComponent,
    canActivate: [validateIdGuard]
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule { }
