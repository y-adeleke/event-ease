import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  loadEvents,
  loadEventsSuccess,
  loadEventById,
  loadEventByIdSuccess,
  loadEventsByUsername,
  loadEventsByUsernameSuccess,
  loadEventByIdFailure,
  loadEventsFailure
} from "../actions/event.actions";
import { dummyEvents } from "../dummy-data";
import { catchError, map, mergeMap, of } from "rxjs";
import { EventService } from "../../core/services/event.service";

@Injectable()
export class EventEffects {
  constructor(
    private actions$: Actions,
    private eventService: EventService,
  ) {}

  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEvents),
      mergeMap(() =>
        this.eventService.getEvents().pipe(
          map(response =>
            loadEventsSuccess({
              events: response.content.map((dto: any) => this.mapEventDtoToEvent(dto)),
            }),
          ),
          catchError(error => {
            console.error("Error loading events", error);
            return of(loadEventsFailure({ error }));
          }),
        ),
      ),
    ),
  );

  loadEventById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEventById),
      mergeMap(action =>
        this.eventService.getEventById(action.id).pipe(
          map(dto => loadEventByIdSuccess({ event: this.mapEventDtoToEvent(dto) })),
          catchError(error => {
            console.error("Error loading event by ID", error);
            return of(loadEventByIdFailure({ error }));
          }),
        ),
      ),
    ),
  );

  loadEventsByUsername$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEventsByUsername),
      mergeMap(action =>
        this.eventService.getEventsByUsername(action.username).pipe(
          map(response =>
            loadEventsByUsernameSuccess({
              events: response.content.map((dto: any) => this.mapEventDtoToEvent(dto)),
            }),
          ),
          catchError(error => {
            console.error("Error loading events by username", error);
            return of({ type: "[Event API] Load Events Failed" });
          }),
        ),
      ),
    ),
  );

  private mapEventDtoToEvent(dto: any): any {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      category: dto.category,
      dateTime: this.randomFutureDate(),
      location: dto.location,
      availableTickets: dto.ticketsLeft,
      price: dto.pricePerTicket,
      pictures: [`assets/images/events/${dto.category.toLowerCase()}.jpg`],
    };
  }

  private randomFutureDate(): Date {
    const daysAhead = Math.floor(Math.random() * 30) + 1;
    return new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000);
  }
}
