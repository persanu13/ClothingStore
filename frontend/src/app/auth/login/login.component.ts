import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { LogInPayload } from '../helpers/interfaces/login.payload';
import { AuthService } from '../helpers/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<any>;
  userToken: string | null = '';
  loginError: boolean = false;
  rememberMe: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.userToken = this.authService.getToken();
    console.log(this.userToken);
    if (this.userToken) {
      this.router.navigateByUrl('/table');
    }
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  handleLogin(): void {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    const payload: LogInPayload = { email, password };
    this.authService.LogIn(payload).subscribe({
      next: (response: {
        authentication: {
          sessionToken: string;
        };
      }) => {
        this.authService.setToken(response.authentication.sessionToken);
        this.userToken = this.authService.getToken();
        sessionStorage.setItem(
          'userToken',
          response.authentication.sessionToken
        );
        if (this.rememberMe) {
          localStorage.setItem(
            'userToken',
            response.authentication.sessionToken
          );
        } else {
          sessionStorage.setItem(
            'userToken',
            response.authentication.sessionToken
          );
        }

        this.router.navigateByUrl('/table');
      },
      error: (err) => {
        this.loginError = true;
        this.loginForm.controls['password'].setValue('');
      },
    });
  }

  handleRegister(): void {
    this.router.navigateByUrl('/register');
  }

  // -------------- form getters ------------------
  get email(): AbstractControl {
    return this.loginForm.controls['email'];
  }

  get password(): AbstractControl {
    return this.loginForm.controls['password'];
  }
}
