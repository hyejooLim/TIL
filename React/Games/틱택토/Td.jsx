import React, { useCallback, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ rowIndex, columnIndex, dispatch, cellData }) => {
  const onClickTd = useCallback(() => {
    // 같은 칸 선택 못함 
    if (cellData) {
      return;
    }
    // 액션 생성 후 액션 디스패치(실행)
    dispatch({ type: CLICK_CELL, row: rowIndex, column: columnIndex });
  }, [cellData]);

  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
