import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  actualPlayerSign: string = 'X';
  boardSize: number = 3;
  saveRequest: boolean = false;
  winner: string = '';
  boardMatrixInRow: string = '';
  actualStep:number =0;


  setActualPlayerSign(sign: number): void {
    this.actualPlayerSign = sign === 1 ? 'X' : 'O';
  }

  setBorderSize(size: number): void {
    this.boardSize = size;
  }

  setSaveRequest(request: boolean ): void {
    if(this.actualStep>0){
    this.saveRequest = request;
    }
  }

  exitRequest(request: boolean): void{
    this.saveRequest = request;
  }

  setWinner(name: string): void {
    this.winner = name;
  }

  setBoardMatrixInOneRow(row: string): void {
    this.boardMatrixInRow = row;
  }

  setActualStep(num : number){
    this.actualStep = num;
  }




}
