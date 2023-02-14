import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserInterface, UserLogin } from '../dtos/User';
import { OrderInterface } from '../dtos/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private userUrl = 'http://localhost:8080/orders'

  placeOrder(order:OrderInterface) {
    return this.http.post<OrderInterface>(`${this.userUrl}`, order).pipe(
      tap(_order => {
        if (_order == null) return
        console.log(`placed order = ${_order}`)
      }),
      catchError(this.handleError<UserInterface>(`place order =${order}`))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // alert("User name does not exist!")
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }
}
