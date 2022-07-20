import Board from '../models/Board';

import Figure from '../models/Figures/Figure';
import Pawn from '../models/Figures/Pawn';
import King from '../models/Figures/King';
import Rook from '../models/Figures/Rook';

import CheckmateChecker from './CheckmateChecker';

import { color, coordinate } from '../Utils/types';
import MovesTrackerController from '../controllers/MovesTrackerController';
import CastleProvider from './CastleProvider';


class FiguresMover {

  private readonly _board;
  private readonly _checkmateCheker;
  private readonly _castleProvider;
  private readonly _movesTrackerController;
 

  constructor(board: Board, checkmateCheker: CheckmateChecker, 
    castleProvider: CastleProvider, movesTrackerController: MovesTrackerController) {
    this._board = board;
    this._checkmateCheker = checkmateCheker;
    this._castleProvider = castleProvider;
    this._movesTrackerController = movesTrackerController;
  }


  private afterMoveActions(figure: Figure, targetCoordinate: coordinate, permissionColor: color): void {

    this._movesTrackerController.writeMove(figure, targetCoordinate, permissionColor);
    this._checkmateCheker.isCheck(permissionColor); 

    if(figure instanceof King || figure instanceof Pawn || figure instanceof Rook) {
      if(!figure.isMovedFigure()) figure.setFigureHasAlreaduMoved();
    }

    if(figure instanceof King) this._checkmateCheker.changeKingCoordinate(figure.getCoordinate(), permissionColor);
  }


  public moveFigure(startCoordinate: coordinate, targetCoordinate: coordinate, permissionColor: color): void {

    const startCell = this._board.getCellByCoordinate(startCoordinate);
    const targetCell = this._board.getCellByCoordinate(targetCoordinate);

    const figure = startCell.getFigure();
    if(!figure) throw new Error(`Cell with coordinates ${startCoordinate} doesn't have figure`);

    if(figure instanceof King)  this._castleProvider.isCastleMove(targetCoordinate, figure);

    targetCell.setFigure(figure);
    startCell.removeFigure();

    this.afterMoveActions(figure, targetCoordinate, permissionColor);
  }

}

export default FiguresMover;