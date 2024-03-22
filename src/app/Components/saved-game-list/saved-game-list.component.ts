import { Component, OnDestroy, OnInit } from '@angular/core';
import { board } from '../../../../Interfaces/board';
import { BoardService } from '../../Services/board.service';
import { CrudService } from '../../Services/crud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-saved-game-list',
  templateUrl: './saved-game-list.component.html',
  styleUrl: './saved-game-list.component.scss'
})
export class SavedGameListComponent implements OnInit, OnDestroy {

  actionLoadOrDelete: string = '';
  allBoardArray?: Array<board>;
  visibleBoard?: Array<Array<number>>;
  visibleBoardId?: number;
  actualActionObject?: board;
  getSubscribtion?: Subscription;


  constructor(private boardService: BoardService, private crudService: CrudService) { }

  ngOnInit(): void {
    this.getSubscribtion = this.crudService.getAllBoard().subscribe(
      data => { if (data) { this.allBoardArray = data; console.log(this.allBoardArray) } }, error => { console.log(error) }
    );
  }

  ngOnDestroy(): void {
    this.getSubscribtion?.unsubscribe()
  }

  getBoardSize(board: board): number {
    return this.boardService.getBoardSize(board);
  }

  setAction(text: string) {
    this.actionLoadOrDelete = text;
  }

  getFieldValue(xCordinate: number, yCordinate: number): string {
    if (this.visibleBoard) {
      return this.boardService.getFieldValue(this.visibleBoard, xCordinate, yCordinate);
    }
    return '';
  }

  viewBoard(board: board): void {
    if (this.visibleBoardId === board.id) {
      this.visibleBoardId = 0;
      return;
    }
    this.visibleBoardId = board.id;
    this.visibleBoard = this.boardService.createBoardMatrix(board.board, this.getBoardSize(board));
  }

  setActionObject(board: board) {
    const deleteSubscription = this.crudService.getBoardById(board).subscribe(
      data => { this.actualActionObject = data },
      error => { console.log(error) },
      () => { deleteSubscription.unsubscribe() })

  }

  deleteOrLoad(text: string, board: board): void {
    this.visibleBoardId = board.id;
    this.visibleBoard = this.boardService.createBoardMatrix(board.board, this.getBoardSize(board));
    this.setActionObject(board)
    this.setAction(text);
  }

  


}
