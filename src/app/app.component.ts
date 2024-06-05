import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameService } from './services/game.service';
import { IBoard } from './interfaces/board';
import { CommonModule, NgFor } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [GameService]
})
export class AppComponent {
  Board: IBoard ={quadrants: []};

  constructor(private service: GameService){
    this.Board = service.Board
  }

  onChange(quadrant: number, row: number, column: number, event: Event){
    const value = (event.target as HTMLInputElement).value
    this.service.setValueHouse(quadrant, row, column, +value)
  }
}
