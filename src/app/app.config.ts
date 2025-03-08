import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { eventReducer } from "./store/reducers/event.reducer";
import { EventEffects } from "./store/effects/event.effects";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({ events: eventReducer }), provideEffects([EventEffects])],
};
