import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectEventById } from "../../../store/selectors/event.selectors";
import { loadEventById } from "../../../store/actions/event.actions";
import { Event } from "../../../core/models/event.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-ticket-purchase",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./ticket-purchase.component.html",
  styleUrls: ["./ticket-purchase.component.scss"],
})
export class TicketPurchaseComponent implements OnInit {
  event$: Observable<Event | undefined> | undefined;
  purchaseForm: FormGroup;
  maxTickets: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.purchaseForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      agreeToTerms: [false, Validators.requiredTrue],
    });
  }

  ngOnInit() {
    const eventId = Number(this.route.snapshot.paramMap.get("id"));
    if (eventId) {
      this.store.dispatch(loadEventById({ id: eventId }));
      this.event$ = this.store.select(selectEventById(eventId));

      this.event$.subscribe(event => {
        if (event) {
          this.maxTickets = event.availableTickets;
          this.purchaseForm
            .get("quantity")
            ?.setValidators([Validators.required, Validators.min(1), Validators.max(this.maxTickets)]);
        }
      });
    }
  }

  onSubmit() {
    if (this.purchaseForm.valid) {
      const formData = this.purchaseForm.value;
      const eventId = this.route.snapshot.paramMap.get("id");
      this.router.navigate(["/payment", eventId], {
        queryParams: {
          email: formData.email,
          quantity: formData.quantity,
        },
      });
    }
  }
}
