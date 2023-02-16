import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/dtos/User';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceSpy : jasmine.SpyObj<UserService>;


  beforeEach(async () => {

    userServiceSpy = jasmine.createSpyObj<UserService>('UserService', ['registerUser', 'loginUser']);
    userServiceSpy.registerUser.and.returnValue(of({id:1, firstName: 'Jon', lastName: 'Bedoy', email:'jonathan@gmail.com', password:'secretPassword'}));


    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [
          {path: 'login', component: BlankComponent},
          {path: 'home', component: BlankComponent},
          {path: 'register', component: BlankComponent}
        ]
      )],
      declarations: [ RegisterComponent ],
      providers: [
        {provide: UserService, useValue: userServiceSpy},
        // {provide: Router, useValue: router}
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to /login', () => {
    const router= TestBed.inject(Router)
    spyOn(router, 'navigate')
    component.goToLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should allow user to register', () => {
    const router= TestBed.inject(Router)
    spyOn(router, 'navigate')

    const formData = {
      "email": "jonathan@gmail.com",
      "password": "secretPassword",
      "firstName": "Jon",
      "lastName": "Bedoy",
    };

    let registerRequest:UserInterface = {
      id: 0,
      email: "jonathan@gmail.com",
      password: "secretPassword",
      firstName: "Jon",
      lastName: "Bedoy"
    }

    component.loginForm.setValue(formData);

    component.submit();
    expect(userServiceSpy.registerUser).toHaveBeenCalledWith(registerRequest)
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  @Component({
    selector: `blank-component`,
    template: `<div></div>`
  })
  class BlankComponent{

  }
});
