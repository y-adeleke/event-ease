import { Routes } from "@angular/router";
import { HomeComponent } from "./features/home/home.component";
import { LoginComponent } from "./features/auth/login/login.component";
import { SignupComponent } from "./features/auth/signup/signup.component";
import { ProfileComponent } from "./features/profile/profile.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { EventDetailComponent } from "./features/events/detail/event-detail.component";
import { CreateEventComponent } from "./features/events/create/create-event.component";
import { ManageEventComponent } from "./features/events/manage/manage-event.component";
import { EventListComponent } from "./features/events/event-list/event-list.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "events/:id", component: EventDetailComponent },
  { path: "profile/create-event", component: CreateEventComponent, canActivate: [AuthGuard] },
  { path: "profile/manage-events", component: ManageEventComponent, canActivate: [AuthGuard] },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "manage-events", component: ManageEventComponent },
      { path: "", redirectTo: "manage-events", pathMatch: "full" },
    ],
  },
  { path: "events", component: EventListComponent },
  { path: "**", redirectTo: "" },
];
