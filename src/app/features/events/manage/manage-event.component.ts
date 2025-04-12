import { Component, OnInit } from "@angular/core";
import { Event } from "../../../core/models/event.model";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { Store } from "@ngrx/store";
import { loadEvents } from "../../../store/actions/event.actions";
import { selectAllEvents } from "../../../store/selectors/event.selectors";
import { EventService } from "../../../core/services/event.service"; // adjust path if needed

@Component({
  selector: "app-manage-event",
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: "./manage-event.component.html",
  styleUrls: ["./manage-event.component.scss"],
})
export class ManageEventComponent implements OnInit {
  events$!: Observable<Event[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadEvents());
    this.events$ = this.store.select(selectAllEvents);
  }
}
/*
import { Component, OnInit } from "@angular/core";
import { Event } from "../../../core/models/event.model";
import { CommonModule } from "@angular/common";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { EventService } from "../../../core/services/event.service";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-manage-event",
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: "./manage-event.component.html",
  styleUrls: ["./manage-event.component.scss"],
})
export class ManageEventComponent implements OnInit {
  events$: Observable<Event[]> = of([]);

  constructor(private eventService: EventService) {}

  ngOnInit() {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      console.error("Token not found. Redirecting to login...");
      return;
    }

    const decoded = this.decodeToken(token);
    if (!decoded?.sub) {
      console.error("Token missing username (sub).");
      return;
    }

    const username = decoded.sub;
    this.loadEventsForUser(username);
  }

  loadEventsForUser(username: string) {
    this.events$ = this.eventService.getEventsByUsername(username).pipe(
      map(res => Array.isArray(res.event) ? res.event : []) //
    );
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));

      const expirationTime = decoded?.exp;
      if (expirationTime && Date.now() / 1000 > expirationTime) {
        console.error("Token has expired");
        sessionStorage.removeItem("authToken");
        return null;
      }

      return decoded;
    } catch (err) {
      console.error("Invalid token", err);
      return null;
    }
  }
}
*/