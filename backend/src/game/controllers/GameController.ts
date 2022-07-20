import BoardController from './BoardController';
import PlayersTurnController from '../classes/PlayersTurnController';
import BoardJSONParser from '../classes/BoardSONParser';

import { coordinate } from '../Utils/types';
import MovesTrackerController from './MovesTrackerController';
import { movesResponse } from '../Utils/interfaces';


class GameController {

  private readonly _boardController;
  private readonly _boardJSONParser;
  private readonly _playerTurnController;
  private readonly _moveTrackerController;

  constructor() {
    this._playerTurnController = new PlayersTurnController();
    this._boardJSONParser = new BoardJSONParser();
    this._moveTrackerController = new MovesTrackerController();
    this._boardController = new BoardController(this._moveTrackerController);
  }

  public getBoardState() {
    return this._boardJSONParser.getBoardJSONState(this._boardController.getBoard());
  }

  public getBoardWithAvaiLabelMovesForFigureByCoordinates(cellCoordinate: coordinate) {
    const permissionColor = this._playerTurnController.getColorWithPermissionToMove();
    const availabelMoves = this._boardController.getMovesForFigure(cellCoordinate, permissionColor);
    return this._boardJSONParser.getBoardJSONStateWithAvailabelMoves(this._boardController.getBoard(), availabelMoves);
  }

  public moveFigure(startCoordinate: coordinate, targetCoordinate: coordinate): void {
    const permissionColor = this._playerTurnController.getColorWithPermissionToMove();
    this._boardController.moveFigure(startCoordinate, targetCoordinate, permissionColor);
    this._playerTurnController.changePermissionToMove();
  }

  public startGame(): void {
    this._boardController.setFiguresOnBoard();
  }

  public getMoves(): movesResponse {
    return this._moveTrackerController.getMovesJSON();
  }
}

export default GameController;