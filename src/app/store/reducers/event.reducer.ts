import { createReducer, on } from "@ngrx/store";
import { Event } from "../../core/models/event.model";
import * as EventActions from "../actions/event.actions";

export interface EventState {
  events: Event[] | null;
  selectedEvent: Event | null;
  loading: boolean;
  error: string | null;
}

export const initialState: EventState = {
  events: null,
  selectedEvent: null,
  loading: false,
  error: null,
};

export const eventReducer = createReducer(
  initialState,
  on(EventActions.loadEvents, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EventActions.loadEventsSuccess, (state, { events }) => ({
    ...state,
    events,
    loading: false,
  })),
  on(EventActions.loadEventsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EventActions.loadEventById, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EventActions.loadEventByIdSuccess, (state, { event }) => ({
    ...state,
    selectedEvent: event,
    loading: false,
  })),
  on(EventActions.loadEventByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
