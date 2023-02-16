import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/dtos/User';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required),
    firstName: new UntypedFormControl('', Validators.required),
    lastName: new UntypedFormControl('', Validators.required)
  });


  constructor(private uService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    let registerRequest:UserInterface = {
      id: 0,
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      firstName: this.loginForm.get('firstName')?.value,
      lastName: this.loginForm.get('lastName')?.value,

    }
    // loginRequest.email = this.loginForm.value.email
    // console.log(registerRequest);
    this.uService.registerUser(registerRequest).subscribe((a) =>  {
      if (a !== null) {
        console.log('Register success... going to login', a)
        alert('Register success... going to login')
        this.goToLogin()
      }
    })
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
