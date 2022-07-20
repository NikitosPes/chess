import React, { ReactElement, useContext } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../contexts/socket';
import { RootState } from '../../store/store';

import getFigureImage from '../../utils/getFigureImage';
import { coordinate, cell } from '../../utils/types';

import styles from './BoardCell.module.scss';


interface BoarCellProps {
  cellData: cell,
  activeCellCoordinate: coordinate,
  setActiveCellCoordinate: (value: coordinate) => void
}


const BoardCell: React.FC<BoarCellProps> = ({ cellData, activeCellCoordinate, setActiveCellCoordinate }) => {

  const socket = useContext(SocketContext);
  const userRoom: string = useSelector((state: RootState) => state.user.room);
  const userColor: string = useSelector((state: RootState) => state.user.color);

  const getStyleForCell = (): Object => {
    if(cellData.figure?.attacked) return styles.attackedCell
    return cellData.color === 'white' ? styles.whiteCell : styles.blackCell
  }
  
  const getImageALT = (): string => {
    return `${cellData.figure!.color[0]}${cellData.figure!.type.toUpperCase()}`
  }
  
  const getCellFigureImage = (): ReactElement | null  => {
    
    if(!cellData.figure) return null

    return(
      <img 
        src={getFigureImage(cellData.figure)} 
        className={`${styles.figureImage} ${userColor === 'black' ? styles.blackSideFigureImg : ''}`} 
        alt={getImageALT()}>
      </img>
    )
  }

  const getMarkOfAvailableMove = (): ReactElement | null => {
    if(!cellData.isAvailabelMove) return null;
    return <div className={styles.availableMoveMark}></div>
  }

  function onClickHandler(cellCoordinate: coordinate): void {

    if(cellData.isAvailabelMove) {
      socket.emit('board:moveFigure', {startCoordinate: activeCellCoordinate, targetCoordinate: cellData.coordinate}, userRoom)
      return; 
    }

    if(!cellData.figure) return;

    setActiveCellCoordinate(cellData.coordinate);
    socket.emit('board:getMoves', userRoom, cellCoordinate);
  }

  return(
    <div className={`${styles.boardCell} ${getStyleForCell()}`} onClick={() => onClickHandler(cellData.coordinate)}>
      {getCellFigureImage()}
      {getMarkOfAvailableMove()}
    </div>
  )
}

export default BoardCell;