import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserLogin } from 'src/app/dtos/User';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(private formBuilder:FormBuilder, private uService:UserService) { }

  ngOnInit(): void {
  }

  display():void {
    let loginRequest:UserLogin = {
      email: this.loginForm.value.email ? this.loginForm.value.email:'',
      password: this.loginForm.value.password ? this.loginForm.value.password : ''
    }
    // loginRequest.email = this.loginForm.value.email
    console.log(loginRequest);
    this.uService.loginUser(loginRequest).subscribe((a) =>  console.log('asdasdadasdsadsad', a))
  }

}
