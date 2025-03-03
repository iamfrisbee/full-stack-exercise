import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss'],
})
export class SecretComponent implements OnInit {
  secret = '';
  isLive = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.secret$.subscribe((secret) => {
      this.secret = secret;
    });

    this.apiService.isLive$.subscribe((isLive) => {
      this.isLive = isLive;
    });
  }
}
