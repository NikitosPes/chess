import Board from '../models/Board';
import Cell from '../models/Cell';

import Figure from '../models/Figures/Figure';
import Pawn from '../models/Figures/Pawn';
import Rook from '../models/Figures/Rook';
import Bishop from '../models/Figures/Bishop';
import Queen from '../models/Figures/Queen';

import { color, coordinate, directionalMoves, moves } from '../Utils/types';


class MovesProvider {

  private readonly _board: Board;

  constructor(board: Board) {
    this._board = board;
  }


  private isCellWithAlliedFigure(coordinate: coordinate, figureColor: color): boolean {
    const cell = this._board.getCellByCoordinate(coordinate);
    if(cell.hasAlliedFigure(figureColor)) return true;
    return false;
  }


  private isAttackMove(coordinate: coordinate, figureColor: color): boolean {
    const cell = this._board.getCellByCoordinate(coordinate);
    if(cell.hasEnemyFigure(figureColor)) return true;
    return false;
  }


  private isCellWithFigure(coordinate: coordinate): boolean {
    const cell = this._board.getCellByCoordinate(coordinate);
    if(cell.getFigure()) return true;
    return false;
  }


  private deleteNotAvailabelMovesFromDirection(directionMoves: moves, figureColor: color): moves {

    const availabelDirectionMove: moves = [];

    for(let move of directionMoves) {
      if(this.isCellWithAlliedFigure(move, figureColor)) break;
      if(this.isAttackMove(move, figureColor)) {
        availabelDirectionMove.push(move);
        break;
      }
      availabelDirectionMove.push(move);
    }

    return availabelDirectionMove;
  }


  private getAvalilabelMovesForFiguresWithDirectionalMoves = (figure: Bishop | Rook | Queen): moves => {

    const figureColor: color = figure.getColor();
    const figureMoves: directionalMoves = figure.getMoves();

    const availabelMoves: moves = [];

    for(let direction of figureMoves) {
      availabelMoves.push(...this.deleteNotAvailabelMovesFromDirection(direction, figureColor))
    }

    return availabelMoves;
  }
  

  private getPawnAvailabelMoves = (figure: Pawn): moves => {

    const figureColor: color = figure.getColor();
    const figureCoordinate: coordinate = figure.getCoordinate();
    const figureMoves: moves = figure.getMoves();
    const availableMoves: moves = [];

    let step: number;
    figureColor == 'black' ? step = 1 : step = -1;

    const attackMoves: moves = [
      {X: figureCoordinate.X + step, Y: figureCoordinate.Y + 1}, 
      {X: figureCoordinate.X + step, Y: figureCoordinate.Y - 1}
    ];

    availableMoves.push(...attackMoves.filter(move => Cell.isValidCoordinate(move.X, move.Y) && this.isAttackMove(move, figureColor)));
    availableMoves.push(...figureMoves.filter(move => !this.isCellWithFigure(move)));
    
    return availableMoves;
  }

   
  public getAvailabelMoves = (figure: Figure): moves => {

    if(figure instanceof Pawn)
      return this.getPawnAvailabelMoves(figure)

    if(figure instanceof Queen || figure instanceof Bishop || figure instanceof Rook)
      return this.getAvalilabelMovesForFiguresWithDirectionalMoves(figure);

    const figurMoves: moves = figure.getMoves() as moves; 
    return figurMoves.filter(move => !this.isCellWithAlliedFigure(move, figure.getColor()));
  }
}

export default MovesProvider;