import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { OrderService } from 'src/app/services/order.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderInterface } from 'src/app/dtos/Order';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let orderServiceSpy : jasmine.SpyObj<OrderService>;


  beforeEach(async () => {

    orderServiceSpy = jasmine.createSpyObj<OrderService>('OrderService', ['placeOrder']);
    orderServiceSpy.placeOrder.and.returnValue(of({
      id: 1,
      items: [{
        id: 1,
        name: 'Tshirt',
        price: 4.99,
        description: 'a plain black shirt'
      },
      {
        id: 2,
        name: 'Hat',
        price: 10.99,
        description: 'a plain Hat'
      }
    ],
      user: {id:1, firstName: 'Jon', lastName: 'Bedoy', email:'jonathan@gmail.com', password:'secretPassword'},
      date: '02/14/2023',
      total: 31.12,
    }));


    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [
          {path: 'login', component: BlankComponent},
          {path: 'home', component: BlankComponent},
          {path: 'register', component: BlankComponent}
        ]
      )],
      declarations: [ OrderComponent ],
      providers: [
        {provide: OrderService, useValue: orderServiceSpy},
        // {provide: Router, useValue: router}
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should redirect to /register', () => {
    const router= TestBed.inject(Router)
    spyOn(router, 'navigate')
    component.logout();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should place an order', () => {

    const orderRequest:OrderInterface = {
      id: 0,
      items: [{
        id: 1
      },
      {
        id: 2
      }
    ],
      user: {
        id: 0
      },
      date: '02/14/2023',
      total: 31.12,
    }
    // component.loginForm.setValue(formData);
    component.submit();

    expect(orderServiceSpy.placeOrder).toHaveBeenCalledWith(orderRequest);
  });

  @Component({
    selector: `blank-component`,
    template: `<div></div>`
  })
  class BlankComponent{

  }
});
