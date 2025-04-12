import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Event } from "../models/event.model";
import { dummyEvents } from "../../store/dummy-data";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class EventService {
  private apiUrl = "http://localhost:8080/api/events";

  constructor(private http: HttpClient) { }

  createEvent(formData: FormData): Observable<void> {
    const token = sessionStorage.getItem("authToken") || "";
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<void>(this.apiUrl, formData, { headers });
  }

  getEvents(): Observable<Event[]> {
    return of(dummyEvents);
  }

  getEventById(id: number): Observable<Event | undefined> {
    const event = dummyEvents.find(e => e.id === id);
    return of(event);
  }

  getEventsByUsername(username: string): Observable<Event[]> {
    const token = sessionStorage.getItem("authToken") || "";
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Event[]>(`${this.apiUrl}/member/${username}`, { headers });
  }
}