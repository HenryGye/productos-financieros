import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';



@NgModule({
  declarations: [
    AlertComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent
  ]
})
export class SharedModule { }
