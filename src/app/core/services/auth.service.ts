import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = "/api";

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }, { responseType: "text" });
  }

  signup(user: User): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/members`, user);
  }

  signOut(): void {
    sessionStorage.removeItem("authToken");
    console.log("Signed out");
  }
}
