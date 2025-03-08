import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor() {}

  login(username: string, password: string): Observable<User> {
    // Return a dummy user
    return of({ id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", phone: "1234567890", username });
  }

  signup(user: User): Observable<User> {
    // Return the same user as dummy data
    return of(user);
  }
}
