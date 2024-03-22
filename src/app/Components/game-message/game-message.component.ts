import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudService } from '../../Services/crud.service';
import { board } from '../../../../Interfaces/board';

@Component({
  selector: 'app-game-message',
  templateUrl: './game-message.component.html',
  styleUrl: './game-message.component.scss'
})
export class GameMessageComponent {

  @Input() visible: boolean = false;
  @Input() winner: string = '';
  @Input() boardMatrixInRow: string = '';
  @Output() visibleInverse: EventEmitter<boolean> = new EventEmitter();
  @Output() sendDeleteWinner: EventEmitter<string> = new EventEmitter();
  gameTitle: FormControl = new FormControl();
  lastBoardObject?: board;
  postSubscribtion?: Subscription;

  constructor(private router: Router, private crudService: CrudService, private actRoute: ActivatedRoute) {
    this.gameTitle.addValidators([Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  }

  save(): void {
    if (this.gameTitle.valid) {
      this.postSubscribtion = this.crudService.postBoard(this.createBoardObject()).subscribe(
        data => { this.lastBoardObject = data as board, this.visibleInverse.emit(false) },
        (error => console.error(error))
      )
    }


  }

  reloade() {

    this.actRoute.params.subscribe((param: any) => {
      let helper: string = param.board as string;
      if (helper) {
        this.router.navigateByUrl('game');
      }
      else { window.location.reload() }
    }
    )

  }

  switchToSave() {
    this.winner = '';
    this.sendDeleteWinner.emit('');
    this.visible = true;
  }

  createBoardObject(): board {
    return {
      id: 1,
      board: this.boardMatrixInRow,
      name: this.gameTitle.value,
    }
  }


}
