import { Socket } from 'socket.io';
import GameStatesManager from '../game/classes/GameStateManager';

import { coordinate, moveFigureSocketData } from '../game/Utils/types';


module.exports = (io: any, socket: Socket) => {

  function getBoardHandler(room: string) {
    const gameController = GameStatesManager.getGameStateByRoom(room);
    io.to(room).emit('board:read', gameController.getBoardState());
  };

  function moveFigureHandler(data: moveFigureSocketData, room: string) {
    const gameController = GameStatesManager.getGameStateByRoom(room);
    gameController.moveFigure(data.startCoordinate, data.targetCoordinate);
    io.to(room).emit('board:read', gameController.getBoardState());
    io.to(room).emit('moves:read', gameController.getMoves());
  };

  function getFigureMovesHandler(room: string, figureCoordinate: coordinate) {
    const gameController = GameStatesManager.getGameStateByRoom(room);
    socket.emit('board:read', gameController.getBoardWithAvaiLabelMovesForFigureByCoordinates(figureCoordinate));
  }
  
  socket.on('board:get', getBoardHandler);
  socket.on('board:getMoves', getFigureMovesHandler)
  socket.on('board:moveFigure', moveFigureHandler);
}