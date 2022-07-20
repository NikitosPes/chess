import Board from '../models/Board';
import Cell from '../models/Cell';

import King from '../models/Figures/King';
import Rook from '../models/Figures/Rook';

import { coordinate, moves } from '../Utils/types';


class CastleProvider {

  private readonly _board;

  constructor(board: Board) {
    this._board = board;
  }

  private isCellWithFigure(cellCoordinate: coordinate): boolean {
    if(this._board.getCellByCoordinate(cellCoordinate).getFigure()) return true;
    return false;
  }

  private abilityToCastle(rowIndex: number, rookColumnIndex: number): boolean {
    const castleDirection: moves = rookColumnIndex === 0 
      ? [{X: rowIndex, Y: 1}, {X: rowIndex, Y: 2}, {X: rowIndex, Y: 3}] 
      : [{X: rowIndex, Y: 5}, {X: rowIndex, Y: 6}];

    for(let cellCoordinates of castleDirection) {
      if(this.isCellWithFigure(cellCoordinates)) return false;
    }
    return true;
  }


  private isAvailableLeftCastle = (rowIndex: number): boolean => {

    const leftRook = this._board.getCellByCoordinate({X: rowIndex, Y: 0}).getFigure() as Rook;
    const king = this._board.getCellByCoordinate({X: rowIndex, Y: 4}).getFigure() as King;

    if(!leftRook.isMovedFigure() && !king.isMovedFigure()) {
      if(this.abilityToCastle(rowIndex, 0)) return true;
    }

    return false;
  }


  private isAvailableRightCastle = (rowIndex: number): boolean => {

    const rightRook = this._board.getCellByCoordinate({X: rowIndex, Y: 7}).getFigure() as Rook;
    const king = this._board.getCellByCoordinate({X: rowIndex, Y: 4}).getFigure() as King;

    if(!rightRook.isMovedFigure() && !king.isMovedFigure()) {
      if(this.abilityToCastle(rowIndex, 7)) return true;
    }

    return false;
  }


  public getCastleMove= (kingFigure: King): moves => {

    if(kingFigure.isAttackedFigure()) return [];

    const castleMoves: moves = [];
    const rowIndex = kingFigure.getColor() === 'white' ? 7 : 0;

    if(this.isAvailableLeftCastle(rowIndex)) castleMoves.push({X: rowIndex, Y: 2});
    if(this.isAvailableRightCastle(rowIndex)) castleMoves.push({X: rowIndex, Y: 6});
    
    return castleMoves;
  }


  private doCaste = (rookCell: Cell, targetRookCell: Cell): void => {

    const rook = rookCell.getFigure() as Rook;
    if(!rook) throw new Error('Cell does`nt have figure');

    targetRookCell.setFigure(rook);
    rookCell.removeFigure();
    rook.setFigureHasAlreaduMoved();
  }


  public isCastleMove = (kingTargetCell: coordinate, figure: King): void => {

    const rowIndex = figure.getColor() === 'white' ? 7 : 0;

    if(Cell.isEqualCoordinates(kingTargetCell, {X: rowIndex, Y: 2})) {
      if(this.isAvailableLeftCastle(rowIndex)) {
        const rookCell = this._board.getCellByCoordinate({X: rowIndex, Y: 0});
        const targetRookCell = this._board.getCellByCoordinate({X: rowIndex, Y: 3});
        this.doCaste(rookCell, targetRookCell);
      }
      return;
    }

    if(Cell.isEqualCoordinates(kingTargetCell, {X: rowIndex, Y: 6})) {
      if(this.isAvailableRightCastle(rowIndex)) {
        const rookCell = this._board.getCellByCoordinate({X: rowIndex, Y: 7});
        const targetRookCell = this._board.getCellByCoordinate({X: rowIndex, Y: 5});
        this.doCaste(rookCell, targetRookCell);
      }
      return;
    }
  }
}


export default CastleProvider;