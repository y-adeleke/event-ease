import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { Router } from "@angular/router";
import { EventService } from "../../../core/services/event.service";
import { MemberService } from "../../../core/services/member.service";
import { NavbarComponent } from "../../../shared-components/navbar/navbar.component";
import { CalendarModule } from "primeng/calendar";

@Component({
  selector: "app-create-event",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    NavbarComponent,
    CalendarModule,
  ],
  templateUrl: "./create-event.component.html",
  styleUrls: ["./create-event.component.scss"],
})
export class CreateEventComponent implements OnInit {
  submitted = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  memberId: string | null = null;
  minDate: Date;

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
    dateTime: ["", [Validators.required, this.futureDateValidator]],
    location: ["", Validators.required],
    totalTickets: [1, [Validators.required, Validators.min(1)]],
    pricePerTicket: [1, [Validators.required, Validators.min(1)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventService: EventService,
    private memberService: MemberService,
  ) {
    this.minDate = new Date();
    this.minDate.setHours(0, 0, 0, 0); // ensures only dates starting today and forward are valid
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to create an event.");
      this.router.navigate(["/login"]);
      return;
    }

    const decoded = this.decodeToken(token);
    const username = decoded?.sub;
    if (username) {
      this.memberService.getMemberByUsername(username).subscribe({
        next: res => {
          this.memberId = res?.id?.toString() || res?.memberId?.toString();
        },
        error: err => {
          console.error("❌ Failed to retrieve member ID", err);
        },
      });
    }
  }

  onCreate(): void {
    this.submitted = true;

    if (this.createEventForm.invalid) {
      alert("Please complete the form correctly.");
      return;
    }

    if (!this.selectedFile) {
      alert("Please select an event image.");
      return;
    }

    if (!this.memberId) {
      alert("User information not loaded. Please try again later.");
      return;
    }

    const formData = new FormData();
    const form = this.createEventForm.value;

    formData.append("title", form.title!);
    formData.append("description", form.description!);
    formData.append("category", form.category!);
    formData.append("location", form.location!);
    formData.append("totalTickets", form.totalTickets!.toString());
    formData.append("pricePerTicket", form.pricePerTicket!.toString());
    formData.append("file", this.selectedFile);
    formData.append("memberId", this.memberId);

    const dt = new Date(form.dateTime!);
    formData.append("dateTime", dt.toISOString().slice(0, 16)); // "yyyy-MM-ddTHH:mm"

    this.eventService.createEvent(formData).subscribe({
      next: () => {
        alert("🎉 Event created!");
        this.router.navigate(["/profile/manage-events"]);
      },
      error: err => {
        console.error("❌ Event creation failed", err);
        alert("Event creation failed. Please try again.");
      },
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.selectedFile = event.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const selectedDate = new Date(control.value);
    return selectedDate > new Date() ? null : { pastDate: true };
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch (err) {
      console.error("❌ Invalid token", err);
      return null;
    }
  }
}
