import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { Event } from "../../core/models/event.model";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { loadEvents } from "../../store/actions/event.actions";
import { selectAllEvents } from "../../store/selectors/event.selectors";
import { interval, Subscription } from "rxjs";
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
  private carouselInterval?: any;

  featuredEvents: Event[] = dummyEvents.filter(event => featuredEventIds.includes(event.id));
  categories: Category[] = eventCategories;

  @HostListener("window:resize")
  onResize() {
    // Update visible slides based on window width
    if (window.innerWidth < 640) {
      // sm breakpoint
      this.visibleSlides = 1;
    } else if (window.innerWidth < 1024) {
      // lg breakpoint
      this.visibleSlides = 2;
    } else {
      this.visibleSlides = 3;
    }
    // Ensure current slide is valid after resize
    this.currentSlide = Math.min(this.currentSlide, this.maxSlide);
  }

  get maxSlide(): number {
    return Math.max(0, Math.ceil(this.featuredEvents.length - this.visibleSlides));
  }

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadEvents());
    this.events$ = this.store.select(selectAllEvents);
    this.startCountdown();
    this.startCarouselAutoplay();
    this.onResize(); // Set initial visible slides
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  private startCountdown() {
    const targetDate = new Date("2024-12-31");

    this.timerSubscription = interval(1000).subscribe(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      this.countdown = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0"),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          .toString()
          .padStart(2, "0"),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          .toString()
          .padStart(2, "0"),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, "0"),
      };
    });
  }

  private startCarouselAutoplay() {
    this.carouselInterval = setInterval(() => {
      if (this.currentSlide < this.maxSlide) {
        this.nextSlide();
      } else {
        this.currentSlide = 0;
      }
    }, 5000);
  }

  nextSlide() {
    if (this.currentSlide < this.maxSlide) {
      this.currentSlide++;
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = Math.min(index, this.maxSlide);
  }

  filterEvent(event: Event): boolean {
    const matchesName = event.title.toLowerCase().includes(this.filterName.toLowerCase());
    const matchesCategory = event.category.toLowerCase().includes(this.filterCategory.toLowerCase());
    const matchesLocation = event.location.toLowerCase().includes(this.filterLocation.toLowerCase());
    return matchesName && matchesCategory && matchesLocation;
  }
}
