import { BehaviorSubject } from 'rxjs';
import { AddPayment, Payment } from 'shared';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnDestroy {
  // timers for the polling
  gridTimer: any;
  secretTimer: any;

  // behavior subjects for the observables
  grid = new BehaviorSubject<string[][]>(
    [...Array(10)].map(() => Array(10).fill(''))
  );
  secret = new BehaviorSubject<string>('');
  letter = new BehaviorSubject<string>('');
  isLive = new BehaviorSubject<boolean>(false);

  // observables as public properties
  grid$ = this.grid.asObservable();
  secret$ = this.secret.asObservable();
  letter$ = this.letter.asObservable();
  isLive$ = this.isLive.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Starts the generator by polling the grid and secret.
   */
  startGenerator(): void {
    // get the grid
    this.postGrid();
    // poll the grid every second
    this.gridTimer = setInterval(() => {
      this.postGrid();
    }, 1000);

    // get the secret
    this.getSecret();
    // poll the secret every two seconds
    this.secretTimer = setInterval(() => {
      this.getSecret();
    }, 2000);

    // set the live status
    this.isLive.next(true);
  }

  /**
   * Pulls the most recent grid from the server.
   */
  getGrid() {
    this.http.get<string[][]>('/api/grid').subscribe((grid: string[][]) => {
      this.grid.next(grid);
    });
  }

  /**
   * Triggers the creation of a new grid.
   */
  postGrid() {
    this.http
      .post<string[][]>('/api/grid', {})
      .subscribe((grid: string[][]) => {
        this.grid.next(grid);
      });
  }

  /**
   * Updates the letter to be 20% of the grid.
   * @param letter the letter to set
   */
  setLetter(letter: string) {
    this.http
      .put<string[][]>('/api/letter', { letter })
      .subscribe((grid: string[][]) => {
        this.grid.next(grid);
        this.letter.next(letter);
      });
  }

  /**
   * Pulls the most recent secret from the server.
   */
  getSecret() {
    this.http.get<string>('/api/secret').subscribe((secret: string) => {
      this.secret.next(secret);
    });
  }

  addPayment(payment: AddPayment) {
    return this.http.post<Payment[]>('/api/payments', payment);
  }

  getPayments() {
    return this.http.get<Payment[]>('/api/payments');
  }

  /**
   * Stops the generator by clearing the polling timers.
   */
  ngOnDestroy() {
    clearInterval(this.gridTimer);
    clearInterval(this.secretTimer);
  }
}
