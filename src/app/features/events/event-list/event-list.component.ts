import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Event } from "../../../core/models/event.model";
import { Observable } from "rxjs";
import { loadEvents } from "../../../store/actions/event.actions";
import { selectAllEvents } from "../../../store/selectors/event.selectors";
import { NavbarComponent } from "../../../shared-components/navbar/navbar.component";
import { EventImageService } from "../../../core/services/event-image.service";

@Component({
  selector: "app-event-list",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
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
    private router: Router,
    private eventImageService: EventImageService
  ) {}

  ngOnInit() {
    this.store.dispatch(loadEvents());
    this.events$ = this.store.select(selectAllEvents);

    // Subscribe to query params to get the category filter
    this.route.queryParams.subscribe(params => {
      if (params["category"]) {
        this.filterCategory = params["category"];
      } else {
        // Clear category filter if no category is specified
        this.filterCategory = "";
      }
    });
  }

  getEventImage(event: Event): string {
    return this.eventImageService.getCategoryImage(event.category);
  }

  filterEvent(event: Event): boolean {
    const matchesName = event.title.toLowerCase().includes(this.filterName.toLowerCase());
    const matchesCategory = this.filterCategory ? 
      event.category.toLowerCase().includes(this.filterCategory.toLowerCase()) : true;
    const matchesLocation = event.location.toLowerCase().includes(this.filterLocation.toLowerCase());
    return matchesName && matchesCategory && matchesLocation;
  }
}
