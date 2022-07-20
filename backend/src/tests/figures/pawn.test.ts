import Pawn from '../../game/models/Figures/Pawn';

describe('Pawn class', () => {
  
  describe('basic moves without figures on board', () => {

    const whitePawn = new Pawn('white');
    const blackPawn = new Pawn('black');

    describe('figure first move', () => {
      
      it('white pawn', () => {

        whitePawn.setCoordinate{X: {X:Y:  }, Y: 2});
        expect(whitePawn.getMoves()).toEqual(expect.arrayContaining([{X: 5, Y: 2}, {X: 4, Y: 2}]));

      });

      it('black pawn', () => {

        blackPawn.setCoordinate({X: 1, Y: 2});
        expect(blackPawn.getMoves()).toEqual(expect.arrayContaining([{X: 2, Y: 2}, {X: 3, Y: 2}]));

      });

    });


    describe('figure has already moved', () => {

      it('white pawn', () => {

        whitePawn.setCoordinates({X: 4, Y: 7});
        whitePawn.setFigureHasAlreaduMoved();
        expect(whitePawn.getMoves()).toEqual(expect.arrayContaining([{X: 3, Y: 7}]));

      });

      it('black pawn', () => {

        blackPawn.setCoordinates({X: 6, Y: 5});
        blackPawn.setFigureHasAlreaduMoved();
        expect(blackPawn.getMoves()).toEqual(expect.arrayContaining([{X: 7, Y: 5}]));

      });

    });


  });

});