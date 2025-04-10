/*import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { MemberService } from "../../core/services/member.service";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { RouterModule } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

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

  isEditable = false;

  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    private jwtHelper: JwtHelperService,
  ) {}

  ngOnInit(): void {
    const token = sessionStorage.getItem("authToken");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      const username = decodedToken?.sub || decodedToken?.username;
      if (username) {
        this.loadUserProfile(username);
      }
    } else {
      alert("User is not logged in or token is expired.");
    }
  }

  loadUserProfile(username: string): void {
    this.memberService.getMemberByUsername(username).subscribe(user => {
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

  onEdit() {
    this.isEditable = !this.isEditable;
  }

  onUpdate() {
    if (this.profileForm.valid) {
      this.memberService.updateMember(this.profileForm.value).subscribe(() => {
        alert("Profile updated successfully!");
        this.isEditable = false;
      });
    }
  }
}
  */

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
