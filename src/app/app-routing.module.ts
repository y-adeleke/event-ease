import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { EventListComponent } from './features/events/event-list/event-list.component';
import { EventDetailComponent } from './features/events/detail/event-detail.component';
import { TicketPurchaseComponent } from './features/tickets/ticket-purchase/ticket-purchase.component';
import { PaymentComponent } from './features/payment/payment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: EventListComponent },
  { path: 'events/:id', component: EventDetailComponent },
  { path: 'events/:id/purchase', component: TicketPurchaseComponent },
  { path: 'payment/:id', component: PaymentComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 