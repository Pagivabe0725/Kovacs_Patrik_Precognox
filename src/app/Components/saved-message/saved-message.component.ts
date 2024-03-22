import { Component, EventEmitter, Input, Output } from '@angular/core';
import { board } from '../../../../Interfaces/board';
import { CrudService } from '../../Services/crud.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-message',
  templateUrl: './saved-message.component.html',
  styleUrl: './saved-message.component.scss'
})
export class SavedMessageComponent {

  @Input() theme: string = '';
  @Input() actualBoardObject?: board;
  @Output() sendActualTheme: EventEmitter<string> = new EventEmitter()


  constructor(private crudService: CrudService, private router : Router) {

  }
  back() {
    this.sendActualTheme.emit('');
  }

  deleteBoard() {
    if (this.actualBoardObject) {
      let sub:Subscription = this.crudService.deleteBoard(this.actualBoardObject).subscribe(
        data => {  }, 
        error => console.log(error),
        () => sub.unsubscribe()
      )
      window.location.reload() 
    }
  }

  load(){
    if(this.actualBoardObject){
      console.log('betölt')
      let boardInOneRow:string = this.actualBoardObject.board
    this.router.navigateByUrl(`game/${boardInOneRow}`)
  }
  }

}
