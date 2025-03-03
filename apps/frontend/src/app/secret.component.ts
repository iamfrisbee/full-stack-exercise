import { Component, OnInit } from '@angular/core';
import { CalculationsService } from './calculations.service';

@Component({
  selector: 'secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss'],
})
export class SecretComponent implements OnInit {
  secret = '';
  isLive = false;

  constructor(private calculationsService: CalculationsService) {}

  ngOnInit() {
    this.calculationsService.secret$.subscribe((secret) => {
      this.secret = secret;
    });

    this.calculationsService.isLive$.subscribe((isLive) => {
      this.isLive = isLive;
    });
  }
}
