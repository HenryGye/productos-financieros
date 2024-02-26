import {Inject, Injectable} from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormularioValidator {
  fechaLiberacionValidator(control: AbstractControl): ValidationErrors | null {
    let valid: boolean = true;
    let message: string = "";

    if (!control.value || !control.value.trim().length) return null;

    if (!FormularioValidator.validarFormatoFecha(control.value)){
      valid = false;
      message = "Formato de fecha inválido";
    } else if (!FormularioValidator.validarFechaMayor(control.value)){
      valid = false;
      message = "Fecha debe ser mayor o igual a la fecha actual";
    } else if (!FormularioValidator.verificarFechaValida(control.value)){
      valid = false;
      message = "Fecha inválida";
    }

    return !valid ? {error: message} : null;
  }

  static validarFormatoFecha(texto: string): boolean {
    const formatoFecha = /^\d{2}\/\d{2}\/\d{4}$/;
    return formatoFecha.test(texto);
  }

  static validarFechaMayor(dateString: string): boolean {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    const currentDate = new Date();
    date.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    return date >= currentDate;
  }

  static incrementarAnioFecha(dateString: string): string {
    const parts = dateString.split('/');
    const day = parts[0];
    const month = parts[1];
    const year = parseInt(parts[2], 10) + 1;
    const nextDate = `${day}/${month}/${year}`;
    return nextDate;
  }

  static verificarFechaValida(fechaString: string) {
    const partes = fechaString.split('/');
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10);
    const anio = parseInt(partes[2], 10);

    if (anio < 1900 || anio > 2100) return false;
    if (mes < 1 || mes > 12) return false;
    const diasEnMes = new Date(anio, mes, 0).getDate();
    if (dia < 1 || dia > diasEnMes) return false;

    return true;
  }

  static convertirFechaAISOString(fecha: string): string {
    const partes = fecha.split('/');
    const fechaFormateada = new Date(+partes[2], +partes[1] - 1, +partes[0]);
    const fechaISO = fechaFormateada.toISOString();
    return fechaISO;
  }
  
  static formatearFechaISOString(fecha: string): string {
    const partes = fecha.split('T')[0].split('-');
    const dia = partes[2];
    const mes = partes[1];
    const año = partes[0];
    return `${dia}/${mes}/${año}`;
  }
}