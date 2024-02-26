import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDateFormatPipe } from './customDates/custom-date-format.pipe';



@NgModule({
  declarations: [
    CustomDateFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomDateFormatPipe
  ]
})
export class PipesModule { }
