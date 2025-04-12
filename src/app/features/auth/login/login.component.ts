import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, RouterModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username as string;
      const password = this.loginForm.value.password as string;

      this.authService.login(username, password).subscribe({
        next: token => {
          console.log("Login successful!");
          console.log("Received token:", token);

          // Save username to localStorage
          localStorage.setItem("username", username);

          this.router.navigate(["/events"]);
        },
        error: error => {
          console.error("Login failed:", error.message || error);
          Object.keys(this.loginForm.controls).forEach(key => {
            const control = this.loginForm.get(key);
            if (control?.invalid) {
              control.markAsTouched();
            }
          });
        },
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      console.warn("⚠️ Login form is invalid. Please fill out all fields.");
    }
  }
}
