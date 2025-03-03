import { Component, OnInit } from '@angular/core';
import { CalculationsService } from './calculations.service';
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

  constructor(private calculationsService: CalculationsService) {}

  /**
   * Subscribes to the grid observable.
   */
  ngOnInit() {
    this.calculationsService.grid$.subscribe((grid) => {
      this.grid = grid;
    });
  }

  onGenerateGrid() {
    this.calculationsService.startGenerator();
  }
}
