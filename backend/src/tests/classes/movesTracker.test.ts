import Bishop from '../../game/models/Figures/Bishop';
import King from '../../game/models/Figures/King';
import Knight from '../../game/models/Figures/Knight';
import Pawn from '../../game/models/Figures/Pawn';
import Queen from '../../game/models/Figures/Queen';
import Rook from '../../game/models/Figures/Rook';

import MovesTrackerController from '../../game/controllers/MovesTrackerController';


describe('Test MovesTrackerContoller', () => {

  it('write only white moves', () => {

    const expected = ['Ng5', 'd1', 'Bc4'];

    const movesTrackerController = new MovesTrackerController();

    const knightFigure = new Knight('white');
    const pawFigure = new Pawn('white');
    const bishopFigure = new Bishop('white');

    movesTrackerController.writeMove(knightFigure, {X: 5, Y: 6}, 'white');
    movesTrackerController.writeMove(pawFigure, {X: 1, Y: 3}, 'white');
    movesTrackerController.writeMove(bishopFigure, {X: 4, Y: 2}, 'white');

    expect(movesTrackerController.getWhiteMoves()).toEqual(expect.arrayContaining(expected));
  })
  

  it('write only black moves', () => {

    const expected = ['Kf6', 'Qb3', 'Re2'];

    const movesTrackerController = new MovesTrackerController();

    const kingFigure = new King('black');
    const queenFigure = new Queen('black');
    const rookFigure = new Rook('black');

    movesTrackerController.writeMove(kingFigure, {X: 6, Y: 5}, 'black');
    movesTrackerController.writeMove(queenFigure, {X: 3, Y: 1}, 'black');
    movesTrackerController.writeMove(rookFigure, {X: 2, Y: 4}, 'black');

    expect(movesTrackerController.getBlackMoves()).toEqual(expect.arrayContaining(expected));
  })

})