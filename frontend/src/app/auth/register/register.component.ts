import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { RegisterService } from '../helpers/services/register.service';
import {
  LetterValidator,
  PasswordValidator,
  PasswordMatchValidator,
} from '../helpers/form.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup<any>;
  isUsed: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        userName: [
          '',
          [
            Validators.required,
            LetterValidator,
            Validators.maxLength(25),
            Validators.minLength(3),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.minLength(8), PasswordValidator],
        ],
        confirmedPassword: [
          '',
          [Validators.required, Validators.minLength(8), PasswordValidator],
        ],
      },
      { validators: PasswordMatchValidator }
    );
  }

  resetFields(): void {
    this.registerForm.controls['userName'].markAsUntouched();
    this.registerForm.controls['email'].markAsUntouched();
    this.registerForm.controls['password'].reset();
    this.registerForm.controls['confirmedPassword'].reset();
  }

  handleBack(): void {
    this.router.navigateByUrl('/login');
  }

  handleSubmit(): void {
    const userName: string = this.registerForm.controls['userName'].value;
    const email: string = this.registerForm.controls['email'].value;
    const password: string = this.registerForm.controls['password'].value;

    this.registerService.createNewUser(email, password, userName).subscribe({
      next: (response) => {
        this.notificationService.success('Success', 'Register have succes!');
        this.router.navigateByUrl('/login');
        this.registerForm.reset();
      },
      error: (err) => {
        console.log(err.status);
        if (err.status == 409) {
          this.isUsed = true;
        } else {
          this.notificationService.error('Error', 'Something went wrong');
        }
        this.resetFields();
      },
    });
  }

  // -------------- form getters ------------------
  get userName(): AbstractControl {
    return this.registerForm.controls['userName'];
  }

  get email(): AbstractControl {
    return this.registerForm.controls['email'];
  }

  get password(): AbstractControl {
    return this.registerForm.controls['password'];
  }
  get confirmedPassword(): AbstractControl {
    return this.registerForm.controls['confirmedPassword'];
  }
}
