import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { LetterComponent } from './letter.component';
import { SecretComponent } from './secret.component';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  imports: [LetterComponent, SecretComponent],
})
export class GridComponent implements OnInit {
  // expose the Math object to the template
  protected Math = Math;
  // the grid of letters
  grid: string[][] = [];

  constructor(private apiService: ApiService) {}

  /**
   * Subscribes to the grid observable.
   */
  ngOnInit() {
    this.apiService.grid$.subscribe((grid) => {
      this.grid = grid;
    });
  }

  onGenerateGrid() {
    this.apiService.startGenerator();
  }
}
