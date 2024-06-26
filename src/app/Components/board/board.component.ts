import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BoardService } from '../../Services/board.service';
import { ActivatedRoute } from '@angular/router';
import { board } from '../../../../Interfaces/board';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnChanges, OnInit {

  @Input() boardSize: number = 3;
  @Output() sendActualPlayerSign: EventEmitter<number> = new EventEmitter();
  @Output() sendWinner: EventEmitter<string> = new EventEmitter();
  @Output() sendBoardMatrix: EventEmitter<string> = new EventEmitter();
  @Output() sendActualStep: EventEmitter<number> = new EventEmitter();
  boardMatrix: Array<Array<number>>;
  fieldNumberToWin: number;
  actualStep: number = 0;
  canStep: boolean = true;
  winnerFields: Array<string> = [];
  loadBoard?: board;

  constructor(private boardService: BoardService, private actRoute: ActivatedRoute) {
    this.boardMatrix = boardService.createBoardMatrix(this.createRowWidthEmptyFields(), this.boardSize);
    this.fieldNumberToWin = this.boardSize === 3 ? 3 : 4;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.boardMatrix = this.boardService.createBoardMatrix(this.createRowWidthEmptyFields(), this.boardSize);
    this.fieldNumberToWin = this.boardSize === 3 ? 3 : 4;
    this.canStep = true;
    this.actualStep = 0;
    this.sendActualStep.emit(this.actualStep);
    this.winnerFields = [];
    this.sendActualPlayerSign.emit(this.actualPlayerSignValue());
  }

  ngOnInit(): void {
    const loading : Subscription =this.actRoute.params.subscribe((param: any) => {
      this.loadBoard = JSON.parse(param.board) as board;
      if (this.loadBoard) {
        this.boardMatrix = this.boardService.createBoardMatrix(this.loadBoard.board, this.boardService.getBoardSize(this.loadBoard));
        this.boardSize = this.boardService.getBoardSize(this.loadBoard);
        this.fieldNumberToWin = this.boardSize === 3 ? 3 : 4;
        this.actualStep = this.calculateActualStep(this.loadBoard.board);
        this.sendActualPlayerSign.emit(this.actualPlayerSignValue());
        this.winnerFields = [];
        this.checker();
        loading.unsubscribe();
      }else{loading.unsubscribe()} 
    })

  }

  calculateActualStep(row: string): number {
    let value: number = 0;
    for (let i = 0; i < row.length; i++) {
      if (row[i] !== '0') {
        value++;
      }
    }
    return value;
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

  isWinnerField(yCordinate: number, xCordinate: number): boolean {

    if (this.winnerFields.includes(yCordinate + ":" + xCordinate)) {
      return true;
    }
    return false;
  }

  fillField(yCordinate: number, xCordinate: number): void {
    if (this.getFieldValue(yCordinate, xCordinate) === '' && this.canStep) {
      this.boardMatrix[yCordinate][xCordinate] = this.actualPlayerSignValue();
      this.actualStep++;
      this.sendActualPlayerSign.emit(this.actualPlayerSignValue())
      this.sendBoardMatrix.emit(this.boardService.matrixInOneRow(this.boardMatrix))
      this.sendActualStep.emit(this.actualStep);
      this.checker()
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


  horizontalChecker(sign: number): Array<string> {

    for (let i = 0; i < this.boardSize; i++) {
      let helperArray: Array<string> = [];
      for (let j = 0; j < this.boardSize; j++) {
        if (i + this.fieldNumberToWin <= this.boardSize) {
          for (let h = 0; h < this.fieldNumberToWin; h++) {
            if (this.boardMatrix[h + i][j] === sign) {
              helperArray.push(h + i + ":" + j)
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

  rightCrossChecker(sign: number): Array<string> {

    for (let i = 0; i < this.boardSize; i++) {
      let helperArray: Array<string> = [];
      for (let j = 0; j < this.boardSize; j++) {
        if (i + this.fieldNumberToWin <= this.boardSize && j + this.fieldNumberToWin <= this.boardSize) {
          for (let h = 0; h < this.fieldNumberToWin; h++) {
            if (this.boardMatrix[h + i][j + h] === sign) {
              helperArray.push((h + i) + ":" + (h + j));
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

  leftCrossChecker(sign: number): Array<string> {

    for (let i = 0; i < this.boardSize; i++) {
      let helperArray: Array<string> = [];
      for (let j = this.boardSize - 1; j >= 0; j--) {
        if (i + this.fieldNumberToWin <= this.boardSize && j - (this.fieldNumberToWin - 1) >= 0) {
          for (let h = 0; h < this.fieldNumberToWin; h++) {
            if (this.boardMatrix[i + h][j - h] === sign) {
              helperArray.push((i + h) + ":" + (j - h));
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

  checker() {

    if (this.winnerFields.length === 0) {
      this.winnerFields = this.verticalChecker(1);
    }
    if (this.winnerFields.length === 0) {
      this.winnerFields = this.verticalChecker(2);
    }
    if (this.winnerFields.length === 0) {
      this.winnerFields = this.horizontalChecker(1);
    }
    if (this.winnerFields.length === 0) {
      this.winnerFields = this.horizontalChecker(2);
    }
    if (this.winnerFields.length === 0) {
      this.winnerFields = this.rightCrossChecker(1);
    }
    if (this.winnerFields.length === 0) {
      this.winnerFields = this.rightCrossChecker(2);
    }
    if (this.winnerFields.length === 0) {
      this.winnerFields = this.leftCrossChecker(1);
    }
    if (this.winnerFields.length === 0) {
      this.winnerFields = this.leftCrossChecker(2);
    }
    if (this.winnerFields.length !== 0 && this.canStep) {
      this.canStep = false;
      this.actualPlayerSignValue() === 1 ? this.sendWinner.emit('Player2') : this.sendWinner.emit('Player1');
    }
    if (this.actualStep === this.boardSize * this.boardSize && this.canStep) {
      this.sendWinner.emit('Draw')
    }

  }



}
