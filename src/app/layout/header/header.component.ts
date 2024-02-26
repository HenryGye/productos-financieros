import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  events = [
    'DATOS PERSONALES',
    'COBERTURA',
    'BIOMETRÍA FACIAL',
    'INSTALACIÓN'
  ];

  href: string = 'http://xtrim.com.ec/prueba_ecommerce';

  constructor() { }

  ngOnInit(): void {
  }

}
