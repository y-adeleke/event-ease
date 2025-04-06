import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { Event } from "../../core/models/event.model";
import { Observable, Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { loadEvents } from "../../store/actions/event.actions";
import { selectAllEvents } from "../../store/selectors/event.selectors";
import { interval } from "rxjs";
import { dummyEvents, eventCategories, Category, featuredEventIds } from "../../store/dummy-data";

interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule, InputTextModule, FormsModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  events$!: Observable<Event[]>;
  filterName: string = "";
  filterCategory: string = "";
  filterLocation: string = "";

  countdown: CountdownTime = {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  };

  currentSlide = 0;
  visibleSlides = 3; // Default for large screens
  private timerSubscription?: Subscription;
  private events: Event[] = [];

  featuredEvents: Event[] = [];
  categories: Category[] = eventCategories;
  nextEvent: Event | undefined;

  constructor(private store: Store) {
    // Find the next upcoming event
    const now = new Date().getTime();
    this.featuredEvents = dummyEvents
      .filter(event => event.dateTime.getTime() > now)
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

    this.nextEvent = this.featuredEvents[0];
  }

  ngOnInit() {
    this.store.dispatch(loadEvents());
    this.events$ = this.store.select(selectAllEvents);
    this.events$.subscribe(events => {
      this.events = events;
    });
    this.startCountdown();
    this.setInitialVisibleSlides();
    this.startCarousel();
  }

  @HostListener("window:resize")
  onResize() {
    this.setInitialVisibleSlides();
  }

  private setInitialVisibleSlides() {
    if (window.innerWidth < 640) {
      this.visibleSlides = 1;
    } else if (window.innerWidth < 1024) {
      this.visibleSlides = 2;
    } else {
      this.visibleSlides = 3;
    }
  }

  private startCountdown() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.nextEvent) {
        this.updateCountdown(this.nextEvent.dateTime);
      }
    });
  }

  private startCarousel() {
    this.timerSubscription = new Observable<number>(subscriber => {
      let count = 0;
      setInterval(() => {
        subscriber.next(count++);
      }, 5000);
    }).subscribe(() => {
      if (this.currentSlide < this.getMaxSlide()) {
        this.nextSlide();
      } else {
        this.currentSlide = 0;
      }
    });
  }

  nextSlide() {
    this.currentSlide = Math.min(this.currentSlide + 1, this.getMaxSlide());
  }

  previousSlide() {
    this.currentSlide = Math.max(this.currentSlide - 1, 0);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  getMaxSlide(): number {
    return Math.max(0, this.featuredEvents.length - this.visibleSlides);
  }

  filterEvent(event: Event): boolean {
    const matchesName = event.title.toLowerCase().includes(this.filterName.toLowerCase());
    const matchesCategory = event.category.toLowerCase().includes(this.filterCategory.toLowerCase());
    const matchesLocation = event.location.toLowerCase().includes(this.filterLocation.toLowerCase());
    return matchesName && matchesCategory && matchesLocation;
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private updateCountdown(eventDate: Date) {
    const now = new Date().getTime();
    const eventTime = eventDate.getTime();
    const distance = eventTime - now;

    // If the event has passed, find the next event
    if (distance < 0) {
      const nextEvent = this.featuredEvents.find(event => event.dateTime.getTime() > now);
      if (nextEvent) {
        this.nextEvent = nextEvent;
        this.updateCountdown(nextEvent.dateTime);
      }
      return;
    }

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update countdown object
    this.countdown = {
      days: days.toString().padStart(2, "0"),
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  }
}
