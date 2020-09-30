import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ValidationsService } from '../../services/validations.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isAccepted = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private vs: ValidationsService) {
    this.createForm();
   }

  ngOnInit() {
    this.presentModal();
  }

  get isButtonValid(): boolean {
    if (!this.isAccepted) {
      return true;
    }
    if (this.isAccepted && this.form.invalid) {
      return true;
    } else if (this.isAccepted && this.form.valid) {
      return false;
    }
  }

  get isUsernameValid(): boolean {
    const userNameField = this.form.get('username');
    return userNameField.invalid && userNameField.touched;
  }

  get isEmailValid(): boolean {
    const emailField = this.form.get('email');
    return emailField.invalid && emailField.touched;
  }

  get isPassword1Valid(): boolean {
    const pass1Field = this.form.get('password1');
    return pass1Field.invalid && pass1Field.touched;
  }

  get isPassword2ValidAndEqualsThatFirst(): boolean {
    const pass1Field = this.form.get('password1').value;
    const pass2Field = this.form.get('password2').value;
    return pass1Field === pass2Field ? false : true;
  }

  private async presentModal(): Promise<void> {
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

  private createForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password1: ['', [Validators.required, Validators.minLength(5)]],
      password2: ['', [Validators.required, Validators.minLength(5)]]
    },
    {
      validators: this.vs.samePasswords('password1', 'password2')
    });
  }

  saveData(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      title: 'Test',
      text: 'Espere',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    setTimeout(() => {
      console.log('Respondió la llamada asíncrona.');
      Swal.hideLoading();
      Swal.fire({
        title: 'Yeah',
        text: 'Se subieron los archivos',
        icon: 'success'
      });
    }, 3000);
  }
}
