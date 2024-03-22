import { Component } from '@angular/core';
import { BoardService } from '../../Services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  boardSize: number = 4;
  boardMatrix: Array<Array<number>>;
  fieldNumberToWin: number;
  actualStep: number = 0

  constructor(private boardService: BoardService) {
    this.boardMatrix = boardService.createBoardMatrix(this.createRowWidthEmptyFields(), this.boardSize);
    this.fieldNumberToWin = this.boardSize === 3 ? 3 : 4;
  }

  createRowWidthEmptyFields(): string {
    let row = '';
    for (let i = 0; i < (this.boardSize * this.boardSize); i++) {
      row += '0';
    }
    return row
  }

  actualPlayerSignValue(): number {
    return this.actualStep % 2 === 0 ? 1 : 2;
  }

  getFieldValue(yCordinate: number, xCordinate: number): string {
    return this.boardService.getFieldValue(this.boardMatrix, yCordinate, xCordinate);
  }

  fillField(yCordinate:number, xCordinate:number):void{
    if(this.getFieldValue(yCordinate,xCordinate) === ''){
      this.boardMatrix[yCordinate][xCordinate] = this.actualPlayerSignValue();
      this.actualStep++;
    }
  }



}
