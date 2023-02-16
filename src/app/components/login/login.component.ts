import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/dtos/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required)
  })


  constructor(private uService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  login():void {
    let loginRequest:UserLogin = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    // loginRequest.email = this.loginForm.value.email
    console.log(loginRequest);
    this.uService.loginUser(loginRequest).subscribe((a) =>  {
      if (a !== null && a.id !== 0) {
        console.log('Login successful... going to homepage', a)
        alert('Login successful... going to homepage')
        this.router.navigate(['/home']);
      } else alert('Login not successful... Try again')
    })
  }

  goToRegister():void {
    this.router.navigate(['/register']);
  }

}
