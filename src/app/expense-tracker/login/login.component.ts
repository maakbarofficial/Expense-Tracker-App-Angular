import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: any;
  registerForm: any;
  activeForm: 'login' | 'register' = 'login'

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  login() {
    if (this.loginForm.valid) {
      console.log("Login Info: ", this.loginForm.value);
      this.router.navigate(['/expense-tracker/dashboard']);
    } else {
      this.snackBar.open("Invalid email or password!", 'Close', { duration: 3000 })
    }
  }

  register() {
    if (this.registerForm.valid) {
      console.log("Register Info: ", this.registerForm.value);
      setTimeout(() => {
        window.location.reload();
      }, 2000)
      this.router.navigate(['/expense-tracker/login']);
    } else {
      this.snackBar.open("Please fill all the fields correctly!", 'Close', { duration: 3000 })
    }
  }
}
