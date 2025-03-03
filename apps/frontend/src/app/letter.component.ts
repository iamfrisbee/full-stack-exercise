import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculationsService } from './calculations.service';

@Component({
  selector: 'letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
  imports: [FormsModule],
})
export class LetterComponent implements OnInit {
  letter = '';

  constructor(private calculationsService: CalculationsService) {}

  ngOnInit() {
    this.calculationsService.letter$.subscribe((letter) => {
      this.letter = letter;
    });
  }

  onLetterChange(event: any) {
    this.calculationsService.setLetter(event.key);
  }
}
