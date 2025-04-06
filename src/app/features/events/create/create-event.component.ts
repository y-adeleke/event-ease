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
  submitted = false; // Flag to track form submission

  categories = [
    { label: "Technology", value: "Technology" },
    { label: "Music", value: "Music" },
    { label: "Sports", value: "Sports" },
    { label: "Food & Drink", value: "Food & Drink" },
    { label: "Arts", value: "Arts" },
    { label: "Business", value: "Business" },
  ];

  createEventForm = this.fb.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
    category: [null, Validators.required],
    date: [null, Validators.required],
    time: [null, Validators.required],
    location: ["", Validators.required],
    totalTickets: [1, [Validators.required, Validators.min(1)]],
    price: [1, [Validators.required, Validators.min(1)]],
    pictures: [""],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  onCreate() {
    this.submitted = true; // Mark form as submitted to show validation messages

    if (this.createEventForm.valid) {
      // Handle event creation (dummy for now)
      this.router.navigate(["/profile/manage-events"]);
    }
  }
}
