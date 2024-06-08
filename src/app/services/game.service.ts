import { Injectable } from '@angular/core';
import { IBoard } from '../interfaces/board';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  Board: IBoard = { quadrants: []}
  
  constructor() {
    this.createBoard()
  }

  private createBoard(): void{
    for(let i= 0; i<9; i++){
      this.Board.quadrants.push({rows: [
          {columns: [{},{},{}]},
          {columns: [{},{},{}]},
          {columns: [{},{},{}]},
        ]
      })
    }
    this.randomNumbers()
  }

  private verifyQuadrante(quadrant:number, value: number){
    let valuesInQuadrant: number[] = []
    
    this.Board.quadrants[quadrant].rows.map((row)=>{
      row.columns.map((column)=> column.value && valuesInQuadrant.push(column.value))
    })
    
    return valuesInQuadrant.includes(value)
  }

  private verifyRow(quadrant: number, row: number, value: number){
    const valuesInRows: number[] = []

    if(quadrant === 0 || quadrant === 3 || quadrant === 6){
      for(let i = 0; i<3; i++){
        this.Board.quadrants[quadrant + i  ].rows[row].columns.map((column)=> valuesInRows.push(column.value || 0))
      }
    } else if(quadrant === 1 || quadrant === 4 || quadrant === 7){
      for(let i = -1; i<2; i++){
        this.Board.quadrants[quadrant + (i) ].rows[row].columns.map((column)=> valuesInRows.push(column.value || 0))
      }
    } else if(quadrant === 2 || quadrant === 5 || quadrant === 8){
      for(let i = -2; i<1; i++){
        this.Board.quadrants[quadrant +i].rows[row].columns.map((column)=> valuesInRows.push(column.value || 0 ))
      }
    } else {
      return;
    }

    //console.log(valuesInRows)
    return valuesInRows.includes(value)
  }

  private verifyColumn(quadrant: number,column:number,value:number){
    const valuesInColumn: number[]= []

    if(quadrant> -1 && quadrant< 3){
      for(let i = 0; i<3; i++){
        this.Board.quadrants[quadrant + i * 3].rows.map((row)=> valuesInColumn.push(row.columns[column].value || 0))
      }
    }else if(quadrant>2 && quadrant<6){
      for(let i = -1; i<2; i++){
        this.Board.quadrants[quadrant + (i * 3)].rows.map((row)=> valuesInColumn.push(row.columns[column].value || 0))
      }
    }else if(quadrant>5 && quadrant<9){
      for(let i = -2; i<1; i++){
        this.Board.quadrants[quadrant + (i * 3)].rows.map((row)=> valuesInColumn.push(row.columns[column].value || 0))
      }
    }else {
      return;
    }

    return valuesInColumn.includes(value);
  }

  private randomNumbers(): void{
    for(let i= 0; i<15; i++){
      let isEmpty = false;
      while (!isEmpty) {
        const {quadrant, row, column} = this.getAleatoryAddress()
        
        if(!this.Board.quadrants[quadrant].rows[row].columns[column].value){
          const number = Math.floor(Math.random()*10)
          if(this.checkMove(quadrant, row, column, number)){
            this.Board.quadrants[quadrant].rows[row].columns[column] = { color: 'darkgreen', value: number}
            isEmpty = !isEmpty
          }
        }
      }
    }
  }

  private getAleatoryAddress(): {quadrant: number, row: number, column: number}{
    return{
      quadrant: Math.floor(Math.random()*9),
      row: Math.floor(Math.random()*3),
      column: Math.floor(Math.random()*3)
    }
  }

  private checkMove(quadrant: number, row: number, column: number, value: number):boolean {
    if(this.verifyQuadrante(quadrant, value) 
      || this.verifyRow(quadrant, row, value) 
      || this.verifyColumn(quadrant, column, value)){
        return false
    }
    return true
  }

  setValueHouse(quadrant: number, row: number, column: number, value: number){
    if(this.checkMove(quadrant, row, column, value)=== false){
        this.Board.quadrants[quadrant].rows[row].columns[column] = { value: value, color: 'red' }
        return;
    }

    this.Board.quadrants[quadrant].rows[row].columns[column]= {value: value, color: ''}
  }
}
