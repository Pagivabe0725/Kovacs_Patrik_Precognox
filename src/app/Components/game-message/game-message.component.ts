import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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

constructor(){
  this.gameTitle.addValidators([Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
}

save():void{
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

}
