import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "../../core/services/user.service";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { RouterModule } from "@angular/router";
import { User } from "../../core/models/user.model";
import { MemberService } from "../../core/services/member.service";
import { Router } from "@angular/router";
import { NavbarComponent } from "../../shared-components/navbar/navbar.component";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, RouterModule, NavbarComponent],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", Validators.required],
    username: ["", Validators.required],
    bankName: ["", Validators.required],
    bankAccountNumber: ["", Validators.required],
    bankRoutingNumber: ["", Validators.required],
    bankCountry: ["", Validators.required],
  });

  isEditable = false; // flag to control form editing

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private memberService: MemberService,
    private router: Router,
  ) {}

  // Add a private variable to store the full user object
  private currentUser!: User;

  ngOnInit(): void {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      this.router.navigate(["/login"]);
      return;
    }

    const decoded = this.decodeToken(token);
    if (!decoded?.sub) {
      console.error("Token missing username/sub claim");
      this.router.navigate(["/login"]);
      return;
    }

    // Log the decoded token to verify the username
    console.log("Decoded token:", decoded);

    // Fetch user profile using the username (decoded sub)
    this.loadUserProfile(decoded.sub);
  }

  // Fetch the user profile and populate the form
  loadUserProfile(username: string): void {
    this.userService.getProfile(username).subscribe((user: User) => {
      this.currentUser = user; // store full user including id

      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        username: user.username,
        bankName: user.bankName,
        bankAccountNumber: user.bankAccountNumber,
        bankRoutingNumber: user.bankRoutingNumber,
        bankCountry: user.bankCountry,
      });
    });
  }

  // Toggle the edit mode for the form
  onEdit() {
    this.isEditable = !this.isEditable;
  }

  // onUpdate() {
  //   if (this.profileForm.valid) {
  //     this.userService.updateProfile(this.profileForm.value as User).subscribe(user => {
  //       // Handle profile update success (e.g., show a success message)
  //       alert("Profile updated successfully!");
  //       this.isEditable = false; // Disable editing after update
  //     });
  //   }
  // }

  onUpdate() {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.value;

      const updatedUser: User = {
        id: this.currentUser.id,
        username: formValue.username ?? "",
        firstName: formValue.firstName ?? "",
        lastName: formValue.lastName ?? "",
        email: formValue.email ?? "",
        phone: formValue.phone ?? "",
        bankName: formValue.bankName ?? "",
        bankAccountNumber: formValue.bankAccountNumber ?? "",
        bankRoutingNumber: formValue.bankRoutingNumber ?? "",
        bankCountry: formValue.bankCountry ?? "",
        password: this.currentUser.password, // or empty string if not required
      };

      this.userService.updateProfile(updatedUser).subscribe(() => {
        alert("Profile updated successfully!");
        this.isEditable = false;
      });
    }
  }

  // onUpdate() {
  //   if (this.profileForm.valid) {
  //     const token = sessionStorage.getItem("authToken") || "";
  //     const headers = new HttpHeaders({
  //       Authorization: `Bearer ${token}`,
  //     });

  //     this.userService.updateProfile(this.profileForm.value as User).subscribe(() => {
  //       // Handle profile update success (e.g., show a success message)
  //       alert("Profile updated successfully!");
  //       this.isEditable = false; // Disable editing after update
  //     });
  //   }
  // }

  // Custom decodeToken method
  decodeToken(token: string): any {
    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));

      // Check for expiration (assuming the token has an exp claim)
      const expirationTime = decoded?.exp;
      if (expirationTime && Date.now() / 1000 > expirationTime) {
        console.error("Token has expired");
        sessionStorage.removeItem("authToken");
        this.router.navigate(["/login"]);
        return null;
      }

      return decoded;
    } catch (err) {
      console.error("❌ Invalid token", err);
      return null;
    }
  }
}

/*
//working code with hardcoded username
import { Component, OnInit } from "@angular/core";
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
export class ProfileComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", Validators.required],
    username: ["", Validators.required],
    bankName: ["", Validators.required],
    bankAccountNumber: ["", Validators.required],
    bankRoutingNumber: ["", Validators.required],
    bankCountry: ["", Validators.required],
  });

  isEditable = false; // flag to control form editing

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const username = "user2"; // Replace with the actual username or fetch it dynamically
    this.loadUserProfile(username);
  }

  // Fetch the user profile and populate the form
  loadUserProfile(username: string): void {
    this.userService.getProfile(username).subscribe((user: User) => {
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        username: user.username,
        bankName: user.bankName,
        bankAccountNumber: user.bankAccountNumber,
        bankRoutingNumber: user.bankRoutingNumber,
        bankCountry: user.bankCountry,
      });
    });
  }

  // Toggle the edit mode for the form
  onEdit() {
    this.isEditable = !this.isEditable;
  }

  onUpdate() {
    if (this.profileForm.valid) {
      this.userService.updateProfile(this.profileForm.value as User).subscribe(user => {
        // Handle profile update success (e.g., show a success message)
        alert("Profile updated successfully!");
        this.isEditable = false; // Disable editing after update
      });
    }
  }
}
*/
