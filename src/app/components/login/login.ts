import { Component, inject } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginModel, UserRegister } from '../../model/user.model';
import { Router } from '@angular/router';
import { UserService } from './user-service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  showLogin: boolean = true

  loginForm: FormGroup;
  registerForm: FormGroup;
 
  userService = inject(UserService)
  fb= inject(FormBuilder)
  router = inject(Router)

  constructor() {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });

    this.registerForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }
    
// Logga in funktion - kopplad med backend server.

 onLogin(){
    if(this.loginForm.valid){
       const payload: LoginModel = {
        Username: this.loginForm.value.username,
        Password: this.loginForm.value.password
       };

      this.userService.loginUser(payload).subscribe({
      next: (res:any) => {
        localStorage.setItem("token", res.token);
        this.router.navigate(['/books']);
  },
      error: () => {
        alert ("Wrong credentials");
      }
    });
  }
}
  
// Registrera funktion - kopplad med backend server.
  onRegister(){
    if(this.registerForm.valid){
      const payload: UserRegister = {
        Username: this.registerForm.value.username,
        Password: this.registerForm.value.password
      }
    console.log('Register payload:', payload.Username);

    this.userService.registerUser(payload).subscribe({
      next: () => {
      this.registerForm.reset()
      alert('User registration success'),
      this.showLogin = true;
      },
      error: (err:any) => 
        {
          alert (err.error || 'Registration failed')
        } 
      });
   }
  }
}

