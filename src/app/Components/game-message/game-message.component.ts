import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class GameMessageComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() winner: string = '';
  @Input() boardMatrixInRow: string = '';

  @Output() visibleInverse: EventEmitter<boolean> = new EventEmitter();
  @Output() sendDeleteWinner: EventEmitter<string> = new EventEmitter();
  gameTitle: FormControl<string> = new FormControl();
  lastBoardObject?: board;
  postSubscribtion?: Subscription;
  patchId?: number;

  constructor(private router: Router, private crudService: CrudService, private actRoute: ActivatedRoute) {
    this.gameTitle.addValidators([Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  }


  ngOnInit(): void {

    const loading = this.actRoute.params.subscribe((param: any) => {
      let loadedBoard: board = JSON.parse(param.board) as board;
      if (loadedBoard) {
        this.patchId = loadedBoard.id;
        this.gameTitle.setValue(loadedBoard.name)

      }
      loading.unsubscribe();
    })

  }

  save(): void {
    if (this.gameTitle.valid) {

      if (!this.patchId) {
        this.postSubscribtion = this.crudService.postBoard(this.createBoardObject()).subscribe(
          data => { this.lastBoardObject = data as board, this.visibleInverse.emit(false), this.router.navigateByUrl('/saved-games') },
          (error => console.error(error))
        )
      }
      else {
        this.gameTitle.disable()
        let helperObject = this.createBoardObject();
        helperObject.id = this.patchId;
        this.postSubscribtion = this.crudService.updateBoard(helperObject).subscribe((data) =>
          this.router.navigateByUrl('/saved-games')
        )
      }

    }
  }

  back() {
    this.visibleInverse.emit(false);
    this.visible = false;
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
