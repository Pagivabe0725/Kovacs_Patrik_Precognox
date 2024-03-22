import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  createBoardMatrix(row: string, size: number) {
    let matrix: Array<Array<number>> = [];
    let h = 0;
    for (let i = 0; i < size; i++) {
      let matrixRow: Array<number> = [];
      for (let j = 0; j < size; j++) {
        matrixRow.push(row[h] === '0' ? 0 : row[h] === '1' ? 1 : 2)
        h++;
      }
      matrix.push(matrixRow);
    }
    return matrix;
  }

  getFieldValue(boardMatrix: Array<Array<number>>, yCordinate: number, xCordinate: number): string {
    return boardMatrix[yCordinate][xCordinate] === 0 ? '' : boardMatrix[yCordinate][xCordinate] === 1 ? 'X' : 'O';
  }

}
