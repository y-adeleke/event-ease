import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class MemberService {
  private apiUrl = "http://localhost:8080/api/members";

  constructor(private http: HttpClient) {}

  getMemberByUsername(username: string): Observable<any> {
    const token = sessionStorage.getItem("authToken") || "";
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/${username}`, { headers });
  }
}
