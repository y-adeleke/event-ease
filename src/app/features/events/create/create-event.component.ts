import { Component } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { ButtonModule } from "primeng/button";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-event",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, InputTextModule, CalendarModule, ButtonModule],
  templateUrl: "./create-event.component.html",
  styleUrls: ["./create-event.component.scss"],
})
export class CreateEventComponent {
  categories = [
    { label: "Tech", value: "Tech" },
    { label: "Music", value: "Music" },
    { label: "Sports", value: "Sports" },
  ];

  createEventForm = this.fb.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
    category: [null, Validators.required],
    dateTime: [null, Validators.required],
    location: ["", Validators.required],
    totalTickets: [0, Validators.required],
    price: [0, Validators.required],
    pictures: [""],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  onCreate() {
    if (this.createEventForm.valid) {
      // Handle event creation (dummy)
      this.router.navigate(["/profile/manage-events"]);
    }
  }
}
