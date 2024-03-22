import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  getFieldValue(boardMatrix: Array<Array<number>>, yCordinate: number, xCordinate: number): string {
    return boardMatrix[yCordinate][xCordinate] === 0 ? '' : boardMatrix[yCordinate][xCordinate] === 1 ? 'X' : 'O';
  }

  createBoardMatrix(row: string, size: number): Array<Array<number>> {
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

  matrixInOneRow(array: Array<Array<number>>): string {
    let row: string = '';
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        switch (array[i][j]) {
          case 0:
            row += '0'
            break;
          case 1:
            row += '1'
            break;
          case 2:
            row += '2'
            break;
        }
      }
    }
    return row;
  }

}
