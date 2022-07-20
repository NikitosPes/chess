import { Socket } from 'socket.io';
import GameStatesManager from '../game/classes/GameStateManager';


module.exports = (io: any, socket: Socket) => {

  function newGameHandler(room: string) {
    console.log(`Create request room: ${room}`)
    GameStatesManager.createNewGameState(room);
    socket.join(room);
  }

  function joinRequestHandler(room: string) {

    if(!GameStatesManager.isStateExist(room)) {
      socket.emit('warning', `room with name: ${room} doesn't exist`);
      return;
    } 

    if(io.sockets.adapter.rooms.get(room).size == 2) {
      console.log('full');
      socket.emit('warning', `Room: ${room} is full`);
      return
    }
    
    const gameController = GameStatesManager.getGameStateByRoom(room);
    gameController.startGame();
    socket.join(room);
    io.to(room).emit('board:read', gameController.getBoardState())
  }

  socket.on('newGame', newGameHandler);
  socket.on('joinGame', joinRequestHandler);
}