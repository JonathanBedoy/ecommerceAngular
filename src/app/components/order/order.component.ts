import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderInterface } from 'src/app/dtos/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private oService:OrderService, private router:Router) { }

  ngOnInit(): void {
  }
  submit(): void {
    let userId:string = JSON.parse(localStorage.getItem('userId') || '0')
    let orderRequest:OrderInterface = {
      id: 0,
      items: [{
        id: 1
      },
      {
        id: 2
      }
    ],
      user: {
        id: parseInt(userId)
      },
      date: '02/14/2023',
      total: 31.12,
    }
    // loginRequest.email = this.loginForm.value.email
    // console.log(registerRequest);
    this.oService.placeOrder(orderRequest).subscribe((a) =>  {
      console.log('Order placed!', a)
      alert('Order has been placed!!!')
    })
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['login'])
  }

}
