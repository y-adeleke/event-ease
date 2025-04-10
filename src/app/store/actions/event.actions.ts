import { createAction, props } from "@ngrx/store";
import { Event } from "../../core/models/event.model";

export const loadEvents = createAction("[Event] Load Events");

export const loadEventsSuccess = createAction("[Event] Load Events Success", props<{ events: Event[] }>());

export const loadEventsFailure = createAction("[Event] Load Events Failure", props<{ error: string }>());

export const loadEventById = createAction("[Event] Load Event By Id", props<{ id: number }>());

export const loadEventByIdSuccess = createAction("[Event] Load Event By Id Success", props<{ event: Event }>());

export const loadEventByIdFailure = createAction("[Event] Load Event By Id Failure", props<{ error: string }>());
