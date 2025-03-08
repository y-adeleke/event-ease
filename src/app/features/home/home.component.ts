import { Component, OnInit } from "@angular/core";
import { Event } from "../../core/models/event.model";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { loadEvents } from "../../store/actions/event.actions";
import { selectAllEvents } from "../../store/selectors/event.selectors";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule, InputTextModule, FormsModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  events$!: Observable<Event[]>;
  filterName: string = "";
  filterCategory: string = "";
  filterLocation: string = "";

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadEvents());
    this.events$ = this.store.select(selectAllEvents);
  }

  filterEvent(event: Event): boolean {
    const matchesName = event.title.toLowerCase().includes(this.filterName.toLowerCase());
    const matchesCategory = event.category.toLowerCase().includes(this.filterCategory.toLowerCase());
    const matchesLocation = event.location.toLowerCase().includes(this.filterLocation.toLowerCase());
    return matchesName && matchesCategory && matchesLocation;
  }
}
