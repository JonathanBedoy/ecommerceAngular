import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../dtos/User';
import { UserLogin } from '../dtos/User';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy:jasmine.SpyObj<HttpClient>
  let user:UserInterface
  // let loginRequest:UserLogin

  beforeEach(() => {
    user = {id:1, firstName: 'Jon', lastName: 'Bedoy', email:'jonathan@gmail.com', password:'secretPassword'};

    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['post']);
    TestBed.configureTestingModule({
      providers:[{provide:HttpClient, useValue: httpClientSpy}]
    })
    service = TestBed.inject(UserService);
    localStorage.clear()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a login request', () => {
    httpClientSpy.post.and.returnValue(of(user))
    let request:UserLogin = {
      email: 'jonathan@gmail.com',
      password: 'secretPassword'
    }
    service.loginUser(request).subscribe((response) => {
      expect(response.id).toBe(1)
    })
  })

  it('should send a register request', () => {
    httpClientSpy.post.and.returnValue(of(user))
    let request:UserInterface = {id:0, firstName: 'Jon', lastName: 'Bedoy', email:'jonathan@gmail.com', password:'secretPassword'}
    service.registerUser(request).subscribe((response) => {
      expect(response.id).toBe(1)
    })
  })
});
