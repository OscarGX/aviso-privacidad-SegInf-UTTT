import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  async presentModal(): Promise<void> {
    const avisoText = `
      La seguridad es muy importante para nosotros, es por eso que quermos proteger tus datos.
      <br>De acuerdo con lo establecido en la<strong> Ley Federal de Protección de Datos Personales en
      Posesión de los Particulares y su Reglamento</strong>, autorizo a "nombre de la empresa etc" el
      tratamiento de mis datos personales de acuerdo a lo previsto en el <a href="#">aviso de privacidad.</a>
    `;
    const { value: accept } = await Swal.fire({
      title: 'Aviso de privacidad',
      html: avisoText,
      input: 'checkbox',
      inputPlaceholder: 'He leido el aviso de privacidad y acepto los términos y condiciones',
      confirmButtonText: 'Aceptar',
      inputValidator: (result) => {
        return !result && 'Debes aceptar los términos y condiciones';
      },
      allowEscapeKey: false,
      allowOutsideClick: false
    });
    return accept;
  }

  showLoading(title: string, text: string): void {
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      title,
      text,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  }

  hideLoading(): void {
    Swal.close();
  }

  showAlertGeneric(title: string, text: string, icon: SweetAlertIcon): void {
    Swal.fire({
      title,
      text,
      icon,
    });
  }

}
