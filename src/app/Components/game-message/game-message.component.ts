import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudService } from '../../Services/crud.service';
import { board } from '../../../../Interfaces/board';

@Component({
  selector: 'app-game-message',
  templateUrl: './game-message.component.html',
  styleUrl: './game-message.component.scss'
})
export class GameMessageComponent {

@Input() visible : boolean = false;
@Input() winner: string = '';
@Input() boardMatrixInRow: string = '';
@Output() visibleInverse: EventEmitter<boolean> = new EventEmitter();
@Output() sendDeleteWinner: EventEmitter<string> = new EventEmitter();
gameTitle: FormControl = new FormControl();
lastBoardObject?:board;
postSubscribtion?: Subscription;

constructor(private router: Router, private crudService: CrudService ){
  this.gameTitle.addValidators([Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
}

save():void{
  if(this.gameTitle.valid){
    this.postSubscribtion = this.crudService.postBoard(this.createBoardObject()).subscribe(
      data => this.lastBoardObject=data as board, (error => console.error(error))
    )
  }

  this.visibleInverse.emit(false)
}

reloade(){
  window.location.reload();
}

switchToSave() {
  this.winner = '';
  this.sendDeleteWinner.emit('');
  this.visible = true;
}

createBoardObject(): board {
  return {
    id:1,
    board: this.boardMatrixInRow,
    name: this.gameTitle.value,
  }
}


}
