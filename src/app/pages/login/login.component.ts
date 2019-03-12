import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  loginData = {
    email: '',
    password: ''
  };
  error: any;

  constructor(public fb: FormBuilder,
              public service: AuthService,
              protected router: Router,
              protected token: TokenService,
              ) {

    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [ Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {}

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  login() {

    if (this.loginForm.valid) {
      this.service.login(this.loginData)
        .then(response => {
          console.log(response);
          this.handleResponse(response);
          this.router.navigate(['home']);
        })
        .catch(err => this.handleError(err));
    }
  }

  handleError(error) {
    this.error = error.error;
    console.log(error);
  }

  handleResponse(data) {
    this.token.handle(data.access_token);
  }


  getErrorMessage(input: String): string {
    if (input === 'Email') {
      return this.loginForm.controls.email.hasError('required')
        ? 'You must enter a value'
        : this.loginForm.controls.email.hasError('email')
        ? 'Not a valid email'
        : '';
    }
    if (input === 'Password') {
      return this.loginForm.controls.password.hasError('required')
        ? 'You must enter a value'
        : this.loginForm.controls.password.hasError('minlength')
        ? 'Min length 6'
        : '';
    }
  }
}
