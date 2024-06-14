import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameService } from './services/game.service';
import { IBoard } from './interfaces/board';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [GameService]
})
export class AppComponent {
  PlayerBoard: IBoard;
  SolvedBoard: IBoard;

  constructor(private service: GameService){
    this.PlayerBoard = service.playerBoard
    this.SolvedBoard = service.solvedBoard
  }

  onChange(quadrant: number, row: number, column: number, event: Event){
    const value = (event.target as HTMLInputElement).value
    this.service.setValueHouse(quadrant, row, column, +value)
  }

}
