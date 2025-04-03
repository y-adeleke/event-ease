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
  signupForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    phone: ["", Validators.required],
    username: ["", Validators.required],
    password: ["", Validators.required],
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
        }
      });
    } else {
      console.warn("Please fill out all fields.");
    }
  }
}
