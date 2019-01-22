import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

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
  constructor(public fb: FormBuilder,
              public service: AuthService,
              private router: Router,
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
    // console.log(this.loginForm.value, this.loginData);
    // this.apiService.httpServicePost(this.serviceName.login, this.loginData)
    // .subscribe( data  => {
    //   this.router.navigate(['user']);

    // });
    if (this.loginForm.valid) {
      this.service.login(this.loginData).then(res => console.log(res))
        .catch(err => console.log(err));
    }

    this.router.navigate(['home']);
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
