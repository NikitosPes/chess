import Board from '../models/Board';

import FiguresMover from '../classes/FiguresMover';
import AvailabelMovesProvider from '../classes/AvailabelMovesProvider';
import CheckmateChecker from '../classes/CheckmateChecker';
import MovesProvider from '../classes/MovesProvider';

import { color, coordinate, moves } from '../Utils/types';
import FiguresSpawner from '../classes/FiguresSpawner';
import MovesTrackerController from './MovesTrackerController';
import CastleProvider from '../classes/CastleProvider';


class BoardController {

  private readonly _board;
  private readonly _movesProvider;
  private readonly _availableMovesProvider;
  private readonly _castleProvider;
  private readonly _checkmateCheker;
  private readonly _figuresSpawner;
  private readonly _figuresMover;

  constructor(movesTrackerController: MovesTrackerController) {
    this._board = new Board();
    this._figuresSpawner = new FiguresSpawner();
    this._movesProvider = new MovesProvider(this._board);
    this._castleProvider = new CastleProvider(this._board);
    this._checkmateCheker = new CheckmateChecker(this._board, this._movesProvider);
    this._figuresMover = new FiguresMover(this._board, this._checkmateCheker, this._castleProvider, movesTrackerController);
    this._availableMovesProvider = new AvailabelMovesProvider(this._board, this._movesProvider, this._checkmateCheker, this._castleProvider);
  }

  public getBoard(): Board {
    return this._board;
  }

  public getMovesForFigure(figureCoordinate: coordinate, permissionColor: color): moves {
    return this._availableMovesProvider.getMoves(figureCoordinate, permissionColor);
  }

  public moveFigure(startCoordinate: coordinate, targetCoordinate: coordinate, permissionColor: color): void {
    this._figuresMover.moveFigure(startCoordinate, targetCoordinate, permissionColor);
  }

  public setFiguresOnBoard(): void {
    this._figuresSpawner.setFiguresOnBoard(this._board);
  }
}

export default BoardController;