import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EventState } from "../reducers/event.reducer";
import { Event } from "../../core/models/event.model";

export const selectEventState = createFeatureSelector<EventState>("events");

export const selectAllEvents = createSelector(selectEventState, (state: EventState) => state.events || []);

export const selectEventById = (id: number) =>
  createSelector(selectAllEvents, (events: Event[]) => events.find(event => event.id === id));

export const selectEventLoading = createSelector(selectEventState, (state: EventState) => state.loading);

export const selectEventError = createSelector(selectEventState, (state: EventState) => state.error);

export const selectUserEvents = createSelector(selectEventState, (state: EventState) => state.userEvents || []);
export const selectUserEventsLoading = createSelector(selectEventState, (state: EventState) => state.loading);
export const selectUserEventsError = createSelector(selectEventState, (state: EventState) => state.error);
