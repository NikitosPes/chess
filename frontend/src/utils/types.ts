export type color = 'black' | 'white';

export type coordinate = {X: number, Y: number};

export type figureType = 'Pawn' | 'Rook' | 'Knight' | 'Bishop' | 'King' | 'Queen';

export type figure = {
  color: color,
  type: figureType,
  attacked?: boolean
};

export type cell = {
  coordinate: coordinate,
  color: color,
  isAvailabelMove: boolean
  figure?: figure
};

