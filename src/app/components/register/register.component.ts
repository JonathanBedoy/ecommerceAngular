import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserInterface } from 'src/app/dtos/User';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });


  constructor(private formBuilder:FormBuilder, private uService:UserService) { }

  ngOnInit(): void {
  }

  submit(): void {
    let registerRequest:UserInterface = {
      id: 0,
      email: this.loginForm.value.email ? this.loginForm.value.email:'',
      password: this.loginForm.value.password ? this.loginForm.value.password : '',
      firstName: this.loginForm.value.firstName ? this.loginForm.value.firstName : '',
      lastName: this.loginForm.value.lastName ? this.loginForm.value.lastName : '',

    }
    // loginRequest.email = this.loginForm.value.email
    // console.log(registerRequest);
    this.uService.registerUser(registerRequest).subscribe((a) =>  console.log('asdasdadasdsadsad', a))
  }

}
