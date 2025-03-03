import { Payment } from 'shared/index.js';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { SecretComponent } from './secret.component';

@Component({
  selector: 'payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
  imports: [SecretComponent, FormsModule],
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  name = '';
  amount = 0;

  constructor(private calculationsService: ApiService) {}

  ngOnInit() {
    this.calculationsService.getPayments().subscribe((payments) => {
      this.payments = payments;
    });
  }

  addPayment() {
    this.calculationsService
      .addPayment({
        name: this.name,
        amount: this.amount,
      })
      .subscribe((payments) => {
        this.payments = payments;
      });
  }
}
