import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ValidationsService } from '../../services/validations.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isAccepted = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private vs: ValidationsService, private as: AlertsService) {
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

  private presentModal() {
    const accept = this.as.presentModal();
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
      return;
    }
    this.as.showLoading('Espere...', 'Estamos haciendo su registro.');
    setTimeout(() => {
      console.log('Respondió la llamada asíncrona.');
      this.as.hideLoading();
      this.as.showAlertGeneric('Yeah!', 'El registró fue exitoso', 'success');
    }, 3000);
  }
}
