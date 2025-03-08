import { Component } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "../../core/services/user.service";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { RouterModule } from "@angular/router";
import { User } from "../../core/models/user.model";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, RouterModule],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {
  profileForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", Validators.required],
    username: ["", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {}

  onUpdate() {
    if (this.profileForm.valid) {
      this.userService.updateProfile(this.profileForm.value as User).subscribe(user => {
        // Handle profile update (dummy)
      });
    }
  }
}
