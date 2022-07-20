import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import BoardCell from '../../components/BoardCell/BoardCell';
import { SocketContext } from '../../contexts/socket';
import { RootState } from '../../store/store';
import { cell, coordinate } from '../../utils/types';

import styles from './Board.module.scss';

const Board: React.FC = () => {

  const socket = useContext(SocketContext);
  const userColor = useSelector((state: RootState) => state.user.color);

  const [board, setBoard] = useState<cell[][]>([]);
  const [activeCellCoordinate, setActiveCellCoordinate] = useState<coordinate>({X: 0, Y: 0});
  

  useEffect(() => {
    socket.on('board:read', (board) => setBoard(board));
    return () => {
      socket.off('board:read');
    }
  }, []);

  const columnsLabels: string[] = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const rowsLabels: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  console.log(board)
  return(
    <div className={styles.board}>

      <div className={styles.columnsLabels}>
        {
          userColor === 'black'
          ? columnsLabels.reverse().map((label, index) => <p className={styles.columnLabel} key={index}>{label}</p>)
          : columnsLabels.map((label, index) => <p className={styles.columnLabel} key={index}>{label}</p>)
        }
      </div>

      <div className={`${styles.boardCells} ${userColor === 'black' ? styles.blackSideBoardCells : ''}`}>
        {
          board.map((row, rowIndex) => row.map((cell, columnIndex) => {
            return(
              <BoardCell 
                cellData={cell} 
                activeCellCoordinate={activeCellCoordinate}
                setActiveCellCoordinate={setActiveCellCoordinate}
                key={`${rowIndex} ${columnIndex} ${cell.color}`}
              />
            ) 
          }))
        }
      </div>

      <div className={styles.rowsLables}>
        {rowsLabels.map((label, index) => <p className={styles.rowLabel} key={index}>{label}</p>)}
      </div>

    </div>
  )
}

export default Board;