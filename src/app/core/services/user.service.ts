import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "../models/user.model";
import { catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class UserService {
  private apiUrl = "/api/members"; // Base API URL
  constructor(private http: HttpClient) {}

  // GET /api/members/{username}
  getProfile(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${username}`);
  }

  // PUT /api/members
  updateProfile(user: User): Observable<void> {
    return this.http.put<void>(this.apiUrl, user);
  }
}
