import { createAction, props } from "@ngrx/store";
import { Event } from "../../core/models/event.model";

// Action to load events
export const loadEvents = createAction("[Event] Load Events");
export const loadEventsSuccess = createAction("[Event] Load Events Success", props<{ events: Event[] }>());
export const loadEventsFailure = createAction("[Event] Load Events Failure", props<{ error: string }>());

// Action to load a single event by ID
export const loadEventById = createAction("[Event] Load Event By Id", props<{ id: number }>());
export const loadEventByIdSuccess = createAction("[Event] Load Event By Id Success", props<{ event: Event }>());
export const loadEventByIdFailure = createAction("[Event] Load Event By Id Failure", props<{ error: string }>());

//action to load events by username
export const loadEventsByUsername = createAction("[Event] Load Events By Username", props<{ username: string }>());
export const loadEventsByUsernameSuccess = createAction(
  "[Event] Load Events By Username Success",
  props<{ events: Event[] }>(),
);
export const loadEventsByUsernameFailure = createAction(
  "[Event] Load Events By Username Failure",
  props<{ error: string }>(),
);
