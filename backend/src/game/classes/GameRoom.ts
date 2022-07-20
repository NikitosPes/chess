import Player from './Player';
import GameController from '../controllers/GameController';

class GameRoom {
  
  private _roomName: string;
  private _player1?: Player;
  private _player2?: Player;
  public gameController: GameController;

  constructor(roomName: string) {
    this._roomName = roomName;
    this.gameController = new GameController();
  }

  public initGameRoom(player1: Player):void {
    this._player1 = player1;
    this.gameController.getBoardState();
  }

  public startGame(player2: Player) {
    this._player2 = player2;
    player2.setColor(this._player1!.getColor() ==='white' ? 'black' : 'white');
    this.gameController.startGame();
  }

  public getRoomInfo() {
    return {
      room: this._roomName,
      player_1: this._player1 ? this._player1.toJSON() : null,
      player_2: this._player2 ? this._player2.toJSON() : null
    }
  }

}

export default GameRoom;