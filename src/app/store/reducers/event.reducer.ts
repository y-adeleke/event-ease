import { createReducer, on } from "@ngrx/store";
import { loadEventsSuccess, loadEventByIdSuccess } from "../actions/event.actions";
import { Event } from "../../core/models/event.model";

export interface EventState {
  events: Event[];
  selectedEvent: Event | null;
}

export const initialState: EventState = { events: [], selectedEvent: null };

export const eventReducer = createReducer(
  initialState,
  on(loadEventsSuccess, (state, { events }) => ({ ...state, events })),
  on(loadEventByIdSuccess, (state, { event }) => ({ ...state, selectedEvent: event })),
);
