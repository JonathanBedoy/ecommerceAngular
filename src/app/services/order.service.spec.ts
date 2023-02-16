import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpClient } from '@angular/common/http';
import { OrderInterface } from '../dtos/Order';
import { of } from 'rxjs';

describe('OrderService', () => {
  let service: OrderService;
  let httpClientSpy:jasmine.SpyObj<HttpClient>
  let orderRequest:OrderInterface
  let orderReceived:OrderInterface

  beforeEach(() => {

    orderRequest = {
      id: 0,
      items: [{
        id: 1
      },
      {
        id: 2
      }
    ],
      user: {
        id: 1
      },
      date: '02/14/2023',
      total: 31.12,
    }
    // --
    orderReceived = {
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
    }
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['post']);
    TestBed.configureTestingModule({
      providers:[{provide:HttpClient, useValue: httpClientSpy}]
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('It should send an Order Request', () => {
    httpClientSpy.post.and.returnValue(of(orderReceived))

    service.placeOrder(orderRequest).subscribe((response) => {
      console.log(response)
      expect(response.id).toBe(1)
    })
  })
});
