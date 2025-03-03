import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
  imports: [FormsModule],
})
export class LetterComponent implements OnInit {
  letter = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.letter$.subscribe((letter) => {
      this.letter = letter;
    });
  }

  onLetterChange(event: any) {
    this.apiService.setLetter(event.key);
  }
}
