import { Component } from '@angular/core';
import { BoardService } from '../../Services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  boardSize: number = 7;
  boardMatrix: Array<Array<number>>;
  fieldNumberToWin: number;
  actualStep: number = 0;
  canStep: boolean = true;

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

  fillField(yCordinate: number, xCordinate: number): void {
    if (this.getFieldValue(yCordinate, xCordinate) === '') {
      this.boardMatrix[yCordinate][xCordinate] = this.actualPlayerSignValue();
      console.log(this.verticalChecker(1))
      this.actualStep++;
    }
  }

  verticalChecker(sign: number): Array<string> {

    for (let i = 0; i < this.boardSize; i++) {
      let helperArray: Array<string> = [];
      for (let j = 0; j < this.boardSize; j++) {
        if (j + this.fieldNumberToWin <= this.boardSize) {
          for (let h = 0; h < this.fieldNumberToWin; h++) {
            if (this.boardMatrix[i][h + j] === sign) {
              helperArray.push(i + ":" + (h + j));
            }
          }
        }
        if (helperArray.length === this.fieldNumberToWin) {
          return helperArray;
        } else {
          helperArray = [];
        }
      }
    }
    return [];
  }

}
