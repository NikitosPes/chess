import Board from '../models/Board';
import Cell from '../models/Cell';

import Figure from '../models/Figures/Figure';
import King from '../models/Figures/King';

import CastleProvider from './CastleProvider';
import MovesProvider from './MovesProvider';
import CheckmateChecker from './CheckmateChecker';

import { color, coordinate, moves } from '../Utils/types';


class AvailabelMovesProvider {

  private readonly _board;
  private readonly _movesProvider;
  private readonly _checkmateChecker;
  private readonly _castleProvider;

  constructor(board: Board, movesProvider: MovesProvider, checkmateChecker: CheckmateChecker, castleProvider: CastleProvider) {
    this._board = board;
    this._movesProvider = movesProvider;
    this._checkmateChecker = checkmateChecker;
    this._castleProvider = castleProvider;
  }

  private doPreMove(startCell: Cell, figure: Figure, targetCell: Cell, permissionColor: color): void {
    targetCell.setFigure(figure);
    startCell.removeFigure();
    if(figure instanceof King) this._checkmateChecker.changeKingCoordinate(targetCell.getCoordinates(), permissionColor);
  }


  private undoPreMove(startCell: Cell, figure: Figure, targetCell: Cell, targetCellFigure: Figure | undefined, permissionColor: color) {
    startCell.setFigure(figure);
    targetCellFigure ? targetCell.setFigure(targetCellFigure) : targetCell.removeFigure();
    if(figure instanceof King) this._checkmateChecker.changeKingCoordinate(startCell.getCoordinates(), permissionColor);
  }


  private isAlliedKingUnderAttack(permissionColor: color): boolean {

    const kingCoordinates = permissionColor === 'white' 
      ? this._checkmateChecker.getWihiteKingCoordinate()
      : this._checkmateChecker.getBlackKingCoordinate();

    return this._checkmateChecker.isFigureUnderAttack(kingCoordinates, permissionColor);
  }


  private isCheckAfterMove(startCoordinate: coordinate, targetCoordinate: coordinate, permissionColor: color) {

    const startCell = this._board.getCellByCoordinate(startCoordinate);
    const targetCell = this._board.getCellByCoordinate(targetCoordinate);
    const figure = startCell.getFigure();
    const targetCellFigure = targetCell.getFigure();

    if(!figure) throw Error('can`t get figure from cell');

    this.doPreMove(startCell, figure, targetCell, permissionColor);

    if(this.isAlliedKingUnderAttack(permissionColor)) {
      this.undoPreMove(startCell, figure, targetCell, targetCellFigure, permissionColor);
      return true;
    } 

    this.undoPreMove(startCell, figure, targetCell, targetCellFigure, permissionColor);
    return false;
  }


  public getMoves = (startCoordinate: coordinate, permissionColor: color): moves => {
    const figure = this._board.getCellByCoordinate(startCoordinate).getFigure();
    if(!figure) throw new Error(`Cell with coordinates ${startCoordinate} doesn't have figure`);

    const figureAvailabelMoves: moves = this._movesProvider.getAvailabelMoves(figure);

    if(figure instanceof King) 
      figureAvailabelMoves.push(...this._castleProvider.getCastleMove(figure));

    return figureAvailabelMoves.filter(move => !this.isCheckAfterMove(startCoordinate, move, permissionColor));
  }
}

export default AvailabelMovesProvider;