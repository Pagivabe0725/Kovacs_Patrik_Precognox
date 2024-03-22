import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { board } from '../../../Interfaces/board';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  postBoard(obj: board): Observable<board> {
    return this.http.post<board>('http://localhost:5000/boards', obj)
  }

  updateBoard(obj: board): Observable<board> {
    return this.http.patch<board>(`http://localhost:5000/boards/${obj.id}`, obj)
  }

  getAllBoard(): Observable<Array<board>> {
    return this.http.get<Array<board>>('http://localhost:5000/boards');
  }

  getBoardById(board:board):Observable<board>{
    return this.http.get<board>(`http://localhost:5000/boards/${board.id}`)
  }

  deleteBoard(board:board):Observable<board>{
    return this.http.delete<board>(`http://localhost:5000/boards/${board.id}`);
  }

}
