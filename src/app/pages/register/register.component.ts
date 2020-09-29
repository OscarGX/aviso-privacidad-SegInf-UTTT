import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isAccepted = false;

  constructor() { }

  ngOnInit() {
    this.presentModal();
  }

  private async presentModal() {
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
    if (accept) {
      this.isAccepted = true;
    }
  }
}
