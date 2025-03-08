import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Event } from "../models/event.model";
import { dummyEvents } from "../../store/dummy-data";

@Injectable({ providedIn: "root" })
export class EventService {
  constructor() {}

  getEvents(): Observable<Event[]> {
    return of(dummyEvents);
  }

  getEventById(id: number): Observable<Event | undefined> {
    const event = dummyEvents.find(e => e.id === id);
    return of(event);
  }
}
