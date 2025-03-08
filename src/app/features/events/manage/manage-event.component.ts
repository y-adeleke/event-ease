import { Component, OnInit } from "@angular/core";
import { Event } from "../../../core/models/event.model";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { Store } from "@ngrx/store";
import { loadEvents } from "../../../store/actions/event.actions";
import { selectAllEvents } from "../../../store/selectors/event.selectors";

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
