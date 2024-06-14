import { Injectable } from '@angular/core';
import { IBoard } from '../interfaces/board';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  playerBoard: IBoard = { quadrants: []}
  solvedBoard: IBoard = {quadrants:[]}
  
  constructor() {
    this.createBoard()
  }

  private createBoard(){
    this.drawBoards()
    this.fillSolvedBoard()
    this.fillPlayerBoard()
  }

  private drawBoards(): void{
    for(let i= 0; i<9; i++){
      this.playerBoard.quadrants.push({rows: [
          {columns: [{},{},{}]},
          {columns: [{},{},{}]},
          {columns: [{},{},{}]},
        ]
      })

      this.solvedBoard.quadrants.push({rows: [
        {columns: [{},{},{}]},
        {columns: [{},{},{}]},
        {columns: [{},{},{}]},
      ]
    })
    }
    
  }

  private fillSolvedBoard(maxQuadrant: number=9, quadrant: number = 0, row:number= 0, column:number = 0): boolean{
    if(quadrant === maxQuadrant) return true;
    if(row ===3) return this.fillSolvedBoard(maxQuadrant, quadrant+1 , 0, 0 );
    if(column === 3) return this.fillSolvedBoard(maxQuadrant, quadrant, row+1, 0);

    const randomNumbers = this.getRandomNumbersArray()

    for(let number of randomNumbers){
      if(this.validateNumber(this.solvedBoard, quadrant, row,column, number)=== true){
        this.solvedBoard.quadrants[quadrant].rows[row].columns[column] = {color: 'darkgreen', value: number}
              
        if(this.fillSolvedBoard(maxQuadrant,quadrant,row, column +1)){
          return true;
        }
        
        this.solvedBoard.quadrants[quadrant].rows[row].columns[column] = {color: undefined, value: undefined};
      }
      }
      
    return false;
  }

  private fillPlayerBoard(): void{
    for(let i= 0; i<15; i++){
      let isEmpty = true;
      
      while(isEmpty){
        const {quadrant, row, column} = this.getAleatoryAddress()
        
        if(!this.playerBoard.quadrants[quadrant].rows[row].columns[column].value){
          this.playerBoard.quadrants[quadrant].rows[row].columns[column] = this.solvedBoard.quadrants[quadrant].rows[row].columns[column]
        }
  
        isEmpty = !isEmpty
      } 
    }
  }


  private getRandomNumbersArray(array: number[] = [1,2,3,4,5,6,7,8,9]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

  private verifyQuadrante(board: IBoard, quadrant:number, value: number){
    let valuesInQuadrant: number[] = []
    
    board.quadrants[quadrant].rows.map((row)=>{
      row.columns.map((column)=> column.value && valuesInQuadrant.push(column.value))
    })
    
    return valuesInQuadrant.includes(value)
  }

  private verifyRow(board:IBoard, quadrant: number, row: number, value: number):boolean{
    const valuesInRows: number[] = []

    if(quadrant === 0 || quadrant === 3 || quadrant === 6){
      for(let i = 0; i<3; i++){
        board.quadrants[quadrant + i  ].rows[row].columns.map((column)=> valuesInRows.push(column.value || 0))
      }
    } else if(quadrant === 1 || quadrant === 4 || quadrant === 7){
      for(let i = -1; i<2; i++){
        board.quadrants[quadrant + (i) ].rows[row].columns.map((column)=> valuesInRows.push(column.value || 0))
      }
    } else if(quadrant === 2 || quadrant === 5 || quadrant === 8){
      for(let i = -2; i<1; i++){
        board.quadrants[quadrant +i].rows[row].columns.map((column)=> valuesInRows.push(column.value || 0 ))
      }
    } else {
      return false;
    }

    return valuesInRows.includes(value)
  }

  private verifyColumn(board:IBoard, quadrant: number,column:number,value:number){
    const valuesInColumn: number[]= []

    if(quadrant> -1 && quadrant< 3){
      for(let i = 0; i<3; i++){
        board.quadrants[quadrant + i * 3].rows.map((row)=> valuesInColumn.push(row.columns[column].value || 0))
      }
    }else if(quadrant>2 && quadrant<6){
      for(let i = -1; i<2; i++){
        board.quadrants[quadrant + (i * 3)].rows.map((row)=> valuesInColumn.push(row.columns[column].value || 0))
      }
    }else if(quadrant>5 && quadrant<9){
      for(let i = -2; i<1; i++){
        board.quadrants[quadrant + (i * 3)].rows.map((row)=> valuesInColumn.push(row.columns[column].value || 0))
      }
    }else {
      return false;
    }

    return valuesInColumn.includes(value);
  }

  private getAleatoryAddress(): {quadrant: number, row: number, column: number}{
    return{
      quadrant: Math.floor(Math.random()*9),
      row: Math.floor(Math.random()*3),
      column: Math.floor(Math.random()*3)
    }
  }

  private validateNumber(board:IBoard, quadrant: number, row: number, column: number, value: number):boolean {
    if(this.verifyQuadrante(board, quadrant, value) 
      || this.verifyRow(board, quadrant, row, value) 
      || this.verifyColumn(board, quadrant, column, value)){
        return false
    }
    return true
  }

  setValueHouse(quadrant: number, row: number, column: number, value: number){
    if(this.validateNumber(this.playerBoard, quadrant, row, column, value)=== false){
        this.playerBoard.quadrants[quadrant].rows[row].columns[column] = { value: value, color: 'red' }
        return;
    }

    this.playerBoard.quadrants[quadrant].rows[row].columns[column]= {value: value, color: ''}
  }
}
