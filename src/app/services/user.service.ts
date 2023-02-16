import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserInterface, UserLogin } from '../dtos/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8080/users'


  registerUser(user:UserInterface) {
    return this.http.post<UserInterface>(`${this.userUrl}`, user).pipe(
      tap(_user => {
        console.log(`Registered User = ${_user}`)
        // if (_user.id) {
        //   localStorage.setItem('userId', _user.id.toString())
        //   // this.loggedIn = true
        //   // this.currentUser = _user
        // }
      }),
      catchError(this.handleError<UserInterface>(`registerUser user=${user}`))
    )
  }

  loginUser(user:UserLogin) {
    return this.http.post<UserInterface>(`${this.userUrl}/login`, user).pipe(
      tap(_user => {
        if (_user == null) return
        console.log(`Registered User = ${_user}`)
        if (_user.id) {
          localStorage.setItem('userId', _user.id.toString())
          // this.loggedIn = true
          // this.currentUser = _user
        }
      }),
      catchError(this.handleError<UserInterface>(`registerUser user=${user}`))
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

