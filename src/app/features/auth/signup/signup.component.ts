import { Component } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { User } from "../../../core/models/user.model";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent {
  bankNames: string[] = [
    "RBC Royal Bank",
    "TD Canada Trust",
    "Scotiabank",
    "BMO Bank of Montreal",
    "CIBC",
    "National Bank of Canada",
    "HSBC Canada",
    "Chase",
    "Bank of America",
    "Wells Fargo",
    "Citibank",
    "Capital One",
  ];

  bankCountries: string[] = ["Canada", "United States", "United Kingdom", "Australia"];

  signupForm = this.fb.group({
    // First name: required, only letters, spaces, hyphens, apostrophes; 2–30 characters
    firstName: ["", [Validators.required, Validators.pattern(/^[A-Za-z\s\-']{2,30}$/)]],

    // Last name: same rules as first name
    lastName: ["", [Validators.required, Validators.pattern(/^[A-Za-z\s\-']{2,30}$/)]],

    // Phone: required, allows US/Canada format
    phone: ["", [Validators.required, Validators.pattern(/^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/)]],

    // Username: required, 3–20 characters, only letters, numbers, underscores, or dots
    username: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.]{3,20}$/)]],

    // Password: required, min 8 characters, must include uppercase, lowercase, number, special character
    password: ["", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]],

    email: ["", [Validators.required, Validators.email]],

    // Bank Account Number: required, 8–20 digits only
    bankAccountNumber: ["", [Validators.required, Validators.pattern(/^\d{8,20}$/)]],

    // Bank Routing Number: required, must be exactly 9 digits
    bankRoutingNumber: ["", [Validators.required, Validators.pattern(/^\d{9}$/)]],

    bankName: ["", Validators.required],

    bankCountry: ["", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  onSignup() {
    if (this.signupForm.valid) {
      const user = this.signupForm.value as User;

      this.authService.signup(user).subscribe({
        next: () => {
          console.log("Signup successful!");
          this.router.navigate(["/login"]);
        },
        error: err => {
          console.error("Signup failed:", err);
        },
      });
    } else {
      console.warn("Please fill out all fields.");
    }
  }
}
