import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private as: AlertsService, private router: Router) {
    this.createForm();
   }

  ngOnInit() {
  }

  get isButtonValid(): boolean {
    return this.form.invalid;
  }

  get isEmailValid(): boolean {
    const email = this.form.get('email');
    return email.invalid && email.touched;
  }

  get isPasswordValid(): boolean {
    const password = this.form.get('password');
    return password.invalid && password.touched;
  }

  saveData(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.as.showLoading('Espere', 'Estamos verificando sus datos...');
    setTimeout(() => {
      this.as.hideLoading();
      // this.as.showAlertGeneric('Yeah!', 'De hecho creo que aquí no iria alerta pero bueno...', 'success');
      // this.router.navigateByUrl('/home');
    }, 3000);
  }

  private createForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

}
