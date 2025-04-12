import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { User } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = "/api";
  private currentToken: string | null = null;

  constructor(private http: HttpClient) {
    this.currentToken = sessionStorage.getItem("authToken");
  }

  login(username: string, password: string): Observable<string> {
    // Clear any existing token before new login attempt
    this.clearAuthData();

    // Create basic auth header
    const authHeader = "Basic " + btoa(username + ":" + password);

    return this.http
      .post(
        `${this.apiUrl}/login`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: authHeader,
            "Content-Type": "application/json",
          }),
          responseType: "text",
        },
      )
      .pipe(
        tap(token => {
          // Store the new token
          this.currentToken = token;
          sessionStorage.setItem("authToken", token);
        }),
      );
  }

  signup(user: User): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/members`, user);
  }

  signOut(): void {
    this.clearAuthData();
  }

  getCurrentToken(): string | null {
    return this.currentToken;
  }

  private clearAuthData(): void {
    this.currentToken = null;
    sessionStorage.removeItem("authToken");
  }

  isLoggedIn(): boolean {
    return !!this.currentToken;
  }
}
