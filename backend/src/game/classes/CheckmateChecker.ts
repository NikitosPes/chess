import Board from '../models/Board';

import Pawn from '../models/Figures/Pawn';
import Rook from '../models/Figures/Rook';
import Knight from '../models/Figures/Knight';
import Bishop from '../models/Figures/Bishop';
import Queen from '../models/Figures/Queen';
import King from '../models/Figures/King';

import MovesProvider from './MovesProvider';

import { color, coordinate } from '../Utils/types';


class CheckmateChecker {

  private readonly _board;
  private readonly _movesProvider;

  private _wKingCoordinate: coordinate;
  private _bKingCoordinate: coordinate;


  constructor(board: Board, movesProvider: MovesProvider) {
    this._board = board;
    this._movesProvider = movesProvider;

    this._bKingCoordinate = {X: 0, Y: 4};
    this._wKingCoordinate = {X: 7, Y: 4};
  }


  private setAttackedStatusForKing(kingCoordinate: coordinate, attackedStatus: boolean): void {
    const kingFigure = this._board.getCellByCoordinate(kingCoordinate).getFigure() as King;
    kingFigure.setAttacked(attackedStatus)
  }


  private isFigureUnderKnightAttack(figureCoordinate: coordinate, figureColor: color): boolean {

    const tempKnightFigure = new Knight(figureColor);
    tempKnightFigure.setCoordinate(figureCoordinate);

    const knightMoves = this._movesProvider.getAvailabelMoves(tempKnightFigure);

    for(let move of knightMoves) {
      const figureOnCell = this._board.getCellByCoordinate(move).getFigure();
      if(figureOnCell instanceof Knight) return true;
    } 

    return false
  }


  private isFigureUnderPawnAttack = (figureCoordinate: coordinate, figureColor: color): boolean => {

    const tempPawnFigure = new Pawn(figureColor);
    tempPawnFigure.setCoordinate(figureCoordinate);

    const pawnMoves = this._movesProvider.getAvailabelMoves(tempPawnFigure);

    for(let move of pawnMoves) { 
      const figureOnCell = this._board.getCellByCoordinate(move).getFigure();
      if(figureOnCell instanceof Pawn) return true;
    }
    return false;
  }


  private isFigureUnderHorizontalOrVerticalAttack = (figureCoordinate: coordinate, figureColor: color): boolean => {

    const tempRookFigure = new Rook(figureColor);
    tempRookFigure.setCoordinate(figureCoordinate);

    const rookMoves = this._movesProvider.getAvailabelMoves(tempRookFigure);

    for(let move of rookMoves) {
      const figureOnCell = this._board.getCellByCoordinate(move).getFigure();
      if(figureOnCell instanceof Queen || figureOnCell instanceof Rook)
        return true;
    }
    return false;
  }


  private isFigureUnderDiagonalsAtack(figureCoordinate: coordinate, figureColor: color): boolean {

    const tempBishopFigure = new Bishop(figureColor);
    tempBishopFigure.setCoordinate(figureCoordinate);

    const bishopMoves = this._movesProvider.getAvailabelMoves(tempBishopFigure);

    for(let move of bishopMoves) {
      const figureOnCell = this._board.getCellByCoordinate(move).getFigure();
      if(figureOnCell instanceof Queen || figureOnCell instanceof Bishop)
        return true;
    }
    return false;
  }


  public getWihiteKingCoordinate = (): coordinate => this._wKingCoordinate;


  public getBlackKingCoordinate = (): coordinate => this._bKingCoordinate;


  public changeKingCoordinate(coordinate: coordinate, permissionColor: color): void {
    permissionColor === 'white' 
      ? this._wKingCoordinate = coordinate
      : this._bKingCoordinate = coordinate;
  }


  public isFigureUnderAttack(figureCoordinate: coordinate, figureColor: color): boolean {
    if(this.isFigureUnderKnightAttack(figureCoordinate, figureColor)) return true;
    if(this.isFigureUnderPawnAttack(figureCoordinate, figureColor)) return true;
    if(this.isFigureUnderHorizontalOrVerticalAttack(figureCoordinate, figureColor)) return true;
    if(this.isFigureUnderDiagonalsAtack(figureCoordinate, figureColor)) return true;
    return false;
  }


  public isCheck = (permissionColor: color) => {
    const kingCoordinates = permissionColor === 'white' ? this._bKingCoordinate : this._wKingCoordinate;
    const kingColor = permissionColor === 'white' ? 'black' : 'white';
    if(this.isFigureUnderAttack(kingCoordinates, kingColor)) {
      this.setAttackedStatusForKing(kingCoordinates, true);
      return true;
    }
    return false;
  }
}

export default CheckmateChecker;