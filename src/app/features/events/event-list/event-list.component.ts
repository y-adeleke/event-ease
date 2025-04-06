import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Event } from "../../../core/models/event.model";
import { Observable } from "rxjs";
import { loadEvents } from "../../../store/actions/event.actions";
import { selectAllEvents } from "../../../store/selectors/event.selectors";

@Component({
  selector: "app-event-list",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.scss"],
})
export class EventListComponent implements OnInit {
  events$!: Observable<Event[]>;
  filterName: string = "";
  filterCategory: string = "";
  filterLocation: string = "";

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.store.dispatch(loadEvents());
    this.events$ = this.store.select(selectAllEvents);

    // Subscribe to query params to get the category filter
    this.route.queryParams.subscribe(params => {
      if (params["category"]) {
        this.filterCategory = params["category"];
      }
    });
  }

  filterEvent(event: Event): boolean {
    const matchesName = event.title.toLowerCase().includes(this.filterName.toLowerCase());
    const matchesCategory = event.category.toLowerCase().includes(this.filterCategory.toLowerCase());
    const matchesLocation = event.location.toLowerCase().includes(this.filterLocation.toLowerCase());
    return matchesName && matchesCategory && matchesLocation;
  }
}
