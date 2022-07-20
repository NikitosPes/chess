import Board from '../models/Board';
import Cell from '../models/Cell';

import { responseCellData } from '../Utils/interfaces';
import { moves, coordinate } from '../Utils/types';


class BoardJSONParser {

  private isCoordinateAvailableMove(availableMoves: moves, coordinate: coordinate): boolean {
    for(let move of availableMoves) {
      if(Cell.isEqualCoordinates(move, coordinate)) return true;
    }
    return false;
  }

  public getBoardJSONState(board: Board) {
    return board.toJSON();
  }

  public getBoardJSONStateWithAvailabelMoves(board: Board, availableMoves: moves): responseCellData[][] {
    
    const result = board.toJSON().map(row => {
        return row.map(cell => {
          if(this.isCoordinateAvailableMove(availableMoves, cell.coordinate)) 
            return {...cell, isAvailabelMove: true};
          return cell;
        });
      });

    return result;
  }
}

export default BoardJSONParser;