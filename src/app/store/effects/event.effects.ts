import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadEvents, loadEventsSuccess, loadEventById, loadEventByIdSuccess } from "../actions/event.actions";
import { dummyEvents } from "../dummy-data";
import { map, delay } from "rxjs/operators";

@Injectable()
export class EventEffects {
  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEvents),
      delay(500), // simulate network delay
      map(() => loadEventsSuccess({ events: dummyEvents })),
    ),
  );

  loadEventById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEventById),
      delay(500),
      map(action => {
        const event = dummyEvents.find(e => e.id === action.id);
        return loadEventByIdSuccess({ event: event! });
      }),
    ),
  );

  constructor(private actions$: Actions) {}
}
