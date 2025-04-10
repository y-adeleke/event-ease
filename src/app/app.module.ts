import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { eventReducer } from "./store/reducers/event.reducer";
import { EventEffects } from "./store/effects/event.effects";
import { HomeComponent } from "./features/home/home.component";
import { EventListComponent } from "./features/events/event-list/event-list.component";
import { EventDetailComponent } from "./features/events/detail/event-detail.component";
import { TicketPurchaseComponent } from "./features/tickets/ticket-purchase/ticket-purchase.component";
import { PaymentComponent } from "./features/payment/payment.component";
import { routes } from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventListComponent,
    EventDetailComponent,
    TicketPurchaseComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot({ events: eventReducer }),
    EffectsModule.forRoot([EventEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
