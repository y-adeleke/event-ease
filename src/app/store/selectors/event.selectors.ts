import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EventState } from "../reducers/event.reducer";

export const selectEventState = createFeatureSelector<EventState>("events");

export const selectAllEvents = createSelector(selectEventState, (state: EventState) => state.events);

export const selectSelectedEvent = createSelector(selectEventState, (state: EventState) => state.selectedEvent);
