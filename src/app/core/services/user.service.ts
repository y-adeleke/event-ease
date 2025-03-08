import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor() {}

  updateProfile(user: User): Observable<User> {
    // Return the updated user as dummy data
    return of(user);
  }
}
