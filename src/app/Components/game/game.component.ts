import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

actualPlayerSign:string = 'X';
boardSize:number=3;



setActualPlayerSign(sign:number):void{
  this.actualPlayerSign = sign === 1 ? 'X' : 'O';
}

setBorderSize(size:number):void{
  this.boardSize=size;
}

}
