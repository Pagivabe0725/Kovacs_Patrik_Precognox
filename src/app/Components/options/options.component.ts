import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss'
})
export class OptionsComponent {

  @Input() actualPlayerSign: string = 'X'
  @Output() sendBoardSize: EventEmitter<number> = new EventEmitter();
  @Output() sendSaveRequest: EventEmitter<boolean> = new EventEmitter();


  setBoardSize(size:number):void{
    this.sendBoardSize.emit(size)
  }

 
}
