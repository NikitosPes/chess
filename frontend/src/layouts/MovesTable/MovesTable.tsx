import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../contexts/socket';

import MovesTableItem from '../../components/MovesTableItem/MovesTableItem';

import styles from './MovesTable.module.scss';


const MovesTable: React.FC = () => {

  const [moves, setMoves] = useState<data>({whiteMoves: [], blackMoves:[]});
  const socket  = useContext(SocketContext);

  type data = {
    whiteMoves: string[],
    blackMoves: string[]
  }

  useEffect(()=>{
    socket.on('moves:read', (moves) => setMoves(moves));
  }, [])

  return (
    <div className={styles.movesTable}>
      <div className={styles.playerNameContainer}>Nikita</div>

      <div className={styles.movesContainer}>
        {
          moves.whiteMoves.map((move, index) => {
            return (
              <MovesTableItem 
              moveIndex={index + 1} 
              whiteMove={move} 
              blackMove={moves?.blackMoves[index]}
              key={index}
              />
            )
          })
        }
      </div>

      <div className={styles.playerNameContainer}>Alex</div>
    </div>
  )
}

export default MovesTable;