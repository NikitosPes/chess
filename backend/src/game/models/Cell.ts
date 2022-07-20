import Figure from './Figures/Figure';

import { color, coordinate } from '../Utils/types';
import { responseCellData } from '../Utils/interfaces';

class Cell {

  private readonly _color: color;//TODO: make this only on frontend
  private readonly _coordinate: coordinate;
  private _figure?: Figure;

  constructor(xCoordinate: number, yCoordinate: number) {
    this._coordinate = {X: xCoordinate, Y: yCoordinate};
    this._color = this.getCellColorByCoordinate(this._coordinate);
  }

  public static isEqualCoordinates(coordinate: coordinate, comparisonСoordinate: coordinate): boolean {
    if(coordinate.X === comparisonСoordinate.X) {
      if(coordinate.Y === comparisonСoordinate.Y) return true
    }
    return false;
  }

  public static isValidCoordinate = (xCoordinate: number, yCoordinate: number): boolean => {
    if(xCoordinate >= 0 && xCoordinate < 8) {
      if(yCoordinate >= 0 && yCoordinate < 8) return true;
    }
    return false;
  } 

  private getCellColorByCoordinate(coordinate: coordinate): color {
    return (coordinate.X + coordinate.Y) % 2 === 0 ? 'white' : 'black';
  }

  public getCoordinates = () => this._coordinate;

  public getColor = () => this._color; 

  public getFigure = (): Figure | undefined => this._figure;

  public setFigure(figure: Figure): void {
    this._figure = figure;
    this._figure.setCoordinate(this._coordinate);
  } 
  
  public removeFigure = (): void => this._figure = undefined;

  public hasAlliedFigure(figureColor: color): boolean {
    
    if(!this._figure) return false;
    const targetFigureColor = this._figure.getColor();

    return targetFigureColor === figureColor ? true : false;
  }

  public hasEnemyFigure = (figureColor: color): boolean => {
    
    if(!this._figure) return false;
    const targetFigureColor = this._figure.getColor();

    return targetFigureColor !== figureColor ? true : false;
  }

  public toJSON = (): responseCellData => {
    return {
      color: this._color,
      coordinate: this._coordinate,
      figure: this._figure ? this._figure.toJSON() : null, 
      isAvailabelMove: false
    }
  }

}

export default Cell;


