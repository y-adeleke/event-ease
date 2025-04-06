import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectEventById } from '../../../store/selectors/event.selectors';
import { Event } from '../../../core/models/event.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  event$: Observable<Event | undefined> | undefined;
  quantity: number = 1;
  email: string = '';

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    if (eventId) {
      this.event$ = this.store.select(selectEventById(eventId));
    }

    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.quantity = Number(params['quantity']);
    });
  }
} 