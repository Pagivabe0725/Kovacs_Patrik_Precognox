import { Component, EventEmitter, Input, Output } from '@angular/core';
import { board } from '../../../../Interfaces/board';
import { CrudService } from '../../Services/crud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-saved-message',
  templateUrl: './saved-message.component.html',
  styleUrl: './saved-message.component.scss'
})
export class SavedMessageComponent {

  @Input() theme: string = '';
  @Input() actualBoardObject?: board;
  @Output() sendActualTheme: EventEmitter<string> = new EventEmitter()


  constructor(private crudService: CrudService,) {

  }
  back() {
    this.sendActualTheme.emit('');
  }

  deleteBoard() {
    if (this.actualBoardObject) {
      console.log(this.actualBoardObject)
      let sub:Subscription = this.crudService.deleteBoard(this.actualBoardObject).subscribe(
        data => {  }, 
        error => console.log(error),
        () => sub.unsubscribe()
      )
      window.location.reload() 
    }
  }

}
