import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EventService } from "../../../core/services/event.service";
import { Event } from "../../../core/models/event.model";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { Store } from "@ngrx/store";
import { loadEventById } from "../../../store/actions/event.actions";
import { selectEventById, selectEventLoading, selectEventError } from "../../../store/selectors/event.selectors";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "../../../shared-components/navbar/navbar.component";

@Component({
  selector: "app-event-detail",
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive, ButtonModule, CardModule, NavbarComponent],
  templateUrl: "./event-detail.component.html",
  styleUrls: ["./event-detail.component.scss"],
})
export class EventDetailComponent implements OnInit {
  event$!: Observable<Event | undefined>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit() {
    const eventId = Number(this.route.snapshot.paramMap.get("id"));
    if (eventId) {
      this.store.dispatch(loadEventById({ id: eventId }));
      this.event$ = this.store.select(selectEventById(eventId));
      this.loading$ = this.store.select(selectEventLoading);
      this.error$ = this.store.select(selectEventError);
    }
  }
}
