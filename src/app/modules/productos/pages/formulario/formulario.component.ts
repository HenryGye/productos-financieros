import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioValidator } from './formulario.validator';
import { FormularioService } from './formulario.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Productos } from 'src/app/core/interfaces/productos';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public form!: FormGroup;
  public submitted: boolean = false;
  public loading: boolean = false;
  private producto!: Productos;

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formularioValidator: FormularioValidator,
    private formularioService: FormularioService,
    private sharedService: SharedService,
    private router: Router) {
      const state = history.state;
      this.initializeForm();
      if (state.producto) this.producto = state.producto;
    }

  get exiteProducto() {
    return this.producto?.id ? true : false;
  }

  get productos() {
    const body: Productos = {
      id: this.form.get('id')?.value,
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      logo: this.form.get('logo')?.value,
      date_release: FormularioValidator.convertirFechaAISOString(this.form.get('date_release')?.value),
      date_revision: FormularioValidator.convertirFechaAISOString(this.form.get('date_revision')?.value)
    };
    return body;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        const verificarProducto = this.producto?.id === params['id'];
        verificarProducto ? this.setFormulario() : this.router.navigate(['/']);
      }
    });

    this.form.get('date_release')?.valueChanges.subscribe(value => {
      if (FormularioValidator.validarFormatoFecha(value)) {
        const nextDate = FormularioValidator.incrementarAnioFecha(value);
        this.form.get('date_revision')?.setValue(nextDate);
      }
    });
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9_-]+$/)]),
      name:new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      logo: new FormControl('', [Validators.required]),
      date_release: new FormControl('', [Validators.required, this.formularioValidator.fechaLiberacionValidator]),
      date_revision: new FormControl({ value: '', disabled: true }, []),
    });
  }

  enviar() {
    this.submitted = true;
    this.form.markAllAsTouched();

    if (this.form != undefined && this.form.valid) {
      this.loading = true;
      this.producto?.id ? this.editarProducto() : this.crearProducto();
    }
  }

  eliminarEspacios(control: string): void {
    const textoSinEspacios = this.form.get(control)?.value.replace(/\s/g, '');
    this.form.get(control)?.setValue(textoSinEspacios);
  }

  setError(error: string) {
    this.loading = false;
    this.sharedService.showAlert(error);
  }

  setFormulario() {
    this.form.get('id')?.setValue(this.producto.id);
    this.form.get('id')?.disable();
    this.form.get('name')?.setValue(this.producto.name);
    this.form.get('description')?.setValue(this.producto.description);
    this.form.get('logo')?.setValue(this.producto.logo);
    this.form.get('date_release')?.setValue(FormularioValidator.formatearFechaISOString(this.producto.date_release));
    this.form.get('date_revision')?.setValue(FormularioValidator.formatearFechaISOString(this.producto.date_revision));
  }

  crearProducto() {
    this.formularioService.verifyProducts(this.form.get('id')?.value).subscribe({
      next: (data) => {
        if (data) {
          this.loading = false;
          this.sharedService.showAlert('Registro ya existe');
          return;
        }
        this.formularioService.postProducts(this.productos).subscribe({
          next: (data) => {
            this.sharedService.showAlert('Registro creado exitósamente');
            this.router.navigate(['/']);
          },
          error: (error) => this.setError(error)
        });
      },
      error: (error) => this.setError(error)
    });
  }

  editarProducto() {
    this.formularioService.putProducts(this.productos).subscribe({
      next: (data) => {
        this.sharedService.showAlert('Registro actualizado exitósamente');
        this.router.navigate(['/']);
      },
      error: (error) => this.setError(error)
    });
  }
}
