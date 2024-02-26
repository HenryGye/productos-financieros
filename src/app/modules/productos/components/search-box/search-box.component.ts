import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @Output() busquedaEmit = new EventEmitter<string>();
  public input!: string;

  buscar() {
    this.busquedaEmit.emit(this.input);
  }
}
