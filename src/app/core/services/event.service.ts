import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Event } from "../models/event.model";
import { dummyEvents } from "../../store/dummy-data";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class EventService {
  private apiUrl = "http://localhost:8080/api/events";

  constructor(private http: HttpClient) {}

  createEvent(formData: FormData): Observable<void> {
    const token = sessionStorage.getItem("authToken") || "";
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<void>(this.apiUrl, formData, { headers });
  }

  getEvents(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getEventById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getEventsByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/member/${username}`);
  }
}
