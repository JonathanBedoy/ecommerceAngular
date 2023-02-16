import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UserLogin } from 'src/app/dtos/User';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // let router:Router;

  let userServiceSpy : jasmine.SpyObj<UserService>;

  beforeEach(async () => {


    userServiceSpy = jasmine.createSpyObj<UserService>('UserService', ['registerUser', 'loginUser']);
    userServiceSpy.loginUser.and.returnValue(of({id:1, firstName: 'Jon', lastName: 'Bedoy', email:'jonathan@gmail.com', password:'secretPassword'}));


    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [
          {path: 'login', component: BlankComponent},
          {path: 'home', component: BlankComponent},
          {path: 'register', component: BlankComponent}
        ]
      )],
      declarations: [ LoginComponent ],
      providers: [
        {provide: UserService, useValue: userServiceSpy},
        // {provide: Router, useValue: router}
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // router = TestBed.get(Router);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow user to login', () => {
    spyOn(window, "alert");
     //your code
    const router= TestBed.inject(Router)
    spyOn(router, 'navigate')

    const formData = {
      "email": "jonathan@gmail.com",
      "password": "secretpassword"
    };
    component.loginForm.setValue(formData);
    component.login();

    let requestLogin:UserLogin = {
      email: "jonathan@gmail.com",
      password: "secretpassword"
    }

    expect(userServiceSpy.loginUser).toHaveBeenCalledWith(requestLogin);
    expect(window.alert).toHaveBeenCalledWith("Login successful... going to homepage");
    expect(router.navigate).toHaveBeenCalledWith(['/home']);

  });

  it('should not allow user to login', () => {
    userServiceSpy.loginUser.and.returnValue(of({id:0}));

    spyOn(window, "alert");
     //your code
    // const router= TestBed.inject(Router)
    // spyOn(router, 'navigate')

    const formData = {
      "email": "jonathan@gmail.com",
      "password": "secretpassword"
    };
    component.loginForm.setValue(formData);
    component.login();

    let requestLogin:UserLogin = {
      email: "jonathan@gmail.com",
      password: "secretpassword"
    }

    expect(userServiceSpy.loginUser).toHaveBeenCalledWith(requestLogin);
    expect(window.alert).toHaveBeenCalledWith("Login not successful... Try again");

  });

  it('Should redirect to /register', () => {
    const router= TestBed.inject(Router)
    spyOn(router, 'navigate')
    component.goToRegister();
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });




  @Component({
    selector: `blank-component`,
    template: `<div></div>`
  })
  class BlankComponent{

  }
});
