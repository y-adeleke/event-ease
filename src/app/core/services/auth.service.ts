// import { Injectable } from "@angular/core";
// import { Observable, of } from "rxjs";
// import { User } from "../models/user.model";

// @Injectable({ providedIn: "root" })
// export class AuthService {
//   constructor() {}

//   login(username: string, password: string): Observable<User> {
//     // Return a dummy user
//     return of({ id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", phone: "1234567890", username });
//   }

//   signup(user: User): Observable<User> {
//     // Return the same user as dummy data
//     return of(user);
//   }
// }

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = "/api";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }, { responseType: "text" });
  }

  signup(user: User): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/members`, user);
  }
}