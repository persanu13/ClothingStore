import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { UsersService } from '../helpers/users.service';
import { RegisterService } from '../helpers/register.service';
import { User } from '../helpers/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() users!: User;
  @Input() modal!: any;
  @Output() addUser = new EventEmitter<any>();
  userForm!: FormGroup<any>;

  constructor(
    private formBuilder: FormBuilder,
    private userService: RegisterService,
    private notificationService: NzNotificationService
  ) {}
  ngOnInit(): void {
    this.createUserForm();
    if (this.users) {
      this.email = this.users.email;
      this.password = this.users.password;
      this.username = this.users.username;
    }
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });
  }

  handleSubmit(): void {
    const email = this.userForm.controls['email'].value;
    const password = this.userForm.controls['password'].value;
    const username = this.userForm.controls['username'].value;
    if (!this.users) {
      this.addClothingCase(email, password, username);
    }
  }

  addClothingCase(email: string, password: string, username: string): void {
    this.userService.createNewUser(email, password, username).subscribe({
      next: (res) => {
        this.notificationService.success(
          'Success',
          'Product added successfully'
        );
        this.addUser.emit(res);
        this.userForm.reset();
      },
      error: () => {
        this.notificationService.error('Error', 'Something went wrong');
      },
    });
  }

  // -------------- form setters ------------------
  set email(value: any) {
    this.userForm.controls['email'].setValue(value);
  }
  set password(value: any) {
    this.userForm.controls['password'].setValue(value);
  }

  set username(value: any) {
    this.userForm.controls['username'].setValue(value);
  }

  // -------------- form getters ------------------
  get email(): AbstractControl {
    return this.userForm.controls['email'];
  }

  get password(): AbstractControl {
    return this.userForm.controls['password'];
  }

  get username(): AbstractControl {
    return this.userForm.controls['username'];
  }
}
