import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectEventById } from '../../store/selectors/event.selectors';
import { loadEventById } from '../../store/actions/event.actions';
import { Event } from '../../core/models/event.model';
import { Observable } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    InputNumberModule,
    DropdownModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  event$: Observable<Event | undefined> | undefined;
  paymentForm: FormGroup;
  email: string = '';
  quantity: number = 0;
  currentTotal: number = 0;
  months = [
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '06', value: '06' },
    { label: '07', value: '07' },
    { label: '08', value: '08' },
    { label: '09', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' }
  ];
  years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() + i;
    return { label: year.toString(), value: year.toString() };
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private fb: FormBuilder
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{16}$/)
      ]],
      cardHolder: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      ]],
      expiryDate: ['', [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/),
        this.validateExpiryDate()
      ]],
      cvv: ['', [
        Validators.required,
        Validators.pattern(/^\d{3,4}$/)
      ]]
    });
  }

  ngOnInit() {
    // Get quantity and email from query params first
    this.route.queryParams.subscribe(params => {
      this.quantity = +params['quantity'] || 0;
      this.email = params['email'] || '';
    });

    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      const numericId = Number(eventId);
      this.store.dispatch(loadEventById({ id: numericId }));
      this.event$ = this.store.select(selectEventById(numericId));
      
      // Subscribe to event changes to update total
      this.event$.subscribe(event => {
        if (event) {
          this.currentTotal = event.price * this.quantity;
        }
      });
    }

    // Add value change subscription for real-time validation
    this.paymentForm.get('cardNumber')?.valueChanges.subscribe(() => {
      this.formatCardNumber();
    });

    this.paymentForm.get('expiryDate')?.valueChanges.subscribe(() => {
      this.formatExpiryDate();
    });
  }

  // Expiry date validator
  private validateExpiryDate() {
    return (control: any) => {
      if (!control.value) return null;
      
      const match = control.value.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/);
      if (!match) return { invalidFormat: true };
      
      const month = parseInt(match[1], 10) - 1;
      const year = parseInt('20' + match[2], 10);
      
      const currentDate = new Date();
      const expiryDate = new Date(year, month, 1);
      expiryDate.setMonth(expiryDate.getMonth() + 1, 0);
      
      const startOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      
      if (expiryDate < startOfCurrentMonth) {
        return { expired: true };
      }
      
      return null;
    };
  }

  // Format card number as user types
  private formatCardNumber() {
    let value = this.paymentForm.get('cardNumber')?.value;
    if (!value) return;
    
    value = value.replace(/\s/g, '').replace(/\D/g, '');
    if (value.length > 16) value = value.substr(0, 16);
    
    this.paymentForm.get('cardNumber')?.setValue(value, { emitEvent: false });
  }

  // Format expiry date as user types
  private formatExpiryDate() {
    let value = this.paymentForm.get('expiryDate')?.value;
    if (!value) return;
    
    value = value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substr(0, 2) + '/' + value.substr(2);
    }
    if (value.length > 5) value = value.substr(0, 5);
    
    this.paymentForm.get('expiryDate')?.setValue(value, { emitEvent: false });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const eventId = this.route.snapshot.paramMap.get('id');
      if (eventId) {
        this.router.navigate(['/confirmation', eventId], {
          queryParams: {
            email: this.email,
            quantity: this.quantity
          }
        });
      }
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.paymentForm.controls).forEach(key => {
        const control = this.paymentForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  get totalAmount(): number {
    return this.currentTotal;
  }
} 