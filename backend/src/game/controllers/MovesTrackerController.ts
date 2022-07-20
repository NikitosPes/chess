import Figure from '../models/Figures/Figure';
import { movesResponse } from '../Utils/interfaces';
import { color, coordinate, figureType } from '../Utils/types';

class MovesTrackerController {

  private whiteFiguresMoves: string[];
  private blackFigureMoves: string[];

  constructor() {
    this.whiteFiguresMoves = [];
    this.blackFigureMoves = [];
  }

  private columnLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  private getFigurelabel(figure: Figure): string {
    const figureType: figureType = figure.toJSON().type;
    if(figureType === 'Pawn') return '';
    if(figureType === 'Knight') return 'N';
    return figureType.toLocaleUpperCase().slice(0, 1);
  }

  private getColumnLabel(coordinate: coordinate): string {
    const y = coordinate.Y;
    return this.columnLabels[y];
  }
 

  private createMove(figure: Figure, targetCoordinate: coordinate): string {
    const figurelabel = this.getFigurelabel(figure);
    const columnLabel = this.getColumnLabel(targetCoordinate);
    const move = figurelabel + columnLabel + targetCoordinate.X;
    return move;
  }

  public getWhiteMoves = (): string[] => this.whiteFiguresMoves;

  public getBlackMoves = (): string[] => this.blackFigureMoves;


  public writeMove(figure: Figure, targetCoordinate: coordinate, permissionColor: color) {
    const move = this.createMove(figure, targetCoordinate);
    permissionColor === 'white'
      ? this.whiteFiguresMoves.push(move)
      : this.blackFigureMoves.push(move);
  }

  public getMovesJSON(): movesResponse {
    return {
      whiteMoves: this.whiteFiguresMoves,
      blackMoves: this.blackFigureMoves
    }
  }

}

export default MovesTrackerController;