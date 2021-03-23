import React, { useContext, useCallback } from 'react';
import {
  CODE,
  TableContext,
  CLICK_CELL,
  CLICK_MINE,
  FLAG_CELL,
  QUESTION_CELL,
  NORMAL_CELL,
} from './MineFind';

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#6b6b6b',
      };
    case CODE.OPENED:
    case CODE.CLICKED_MINE:
      return {
        background: '#fff',
      };
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return {
        background: 'yellow',
      };
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return {
        background: 'red',
      };
    default:
      return {
        background: '#fff',
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑!';
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return '!';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?';
    default:
      return code;
  }
};

const Td = ({ rowIndex, columnIndex }) => {
  const { tableData, stop, dispatch } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if (stop) {
      return;
    }
    switch (tableData[rowIndex][columnIndex]) {
      case CODE.OPENED:
      case CODE.FLAG:
      case CODE.FLAG_MINE:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        return;
      case CODE.NORMAL:
        dispatch({ type: CLICK_CELL, row: rowIndex, column: columnIndex });
        return;
      case CODE.MINE: // 지뢰를 누른 경우
        dispatch({ type: CLICK_MINE, row: rowIndex, column: columnIndex });
        return;
    }
  }, [tableData[rowIndex][columnIndex], stop]);

  // 마우스 오른쪽 클릭 이벤트 
  const onClickRightTd = useCallback((e) => {
    e.preventDefault();
    if (stop) {
      return;
    }
    switch (tableData[rowIndex][columnIndex]) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({ type: FLAG_CELL, row: rowIndex, column: columnIndex });
        return;
      case CODE.FLAG:
      case CODE.FLAG_MINE:
        dispatch({ type: QUESTION_CELL, row: rowIndex, column: columnIndex });
        return;
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        dispatch({ type: NORMAL_CELL, row: rowIndex, column: columnIndex });
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][columnIndex], stop]);

  return (
    <td
      style={getTdStyle(tableData[rowIndex][columnIndex])}
      onClick={onClickTd}
      onContextMenu={onClickRightTd}
    >
      {getTdText(tableData[rowIndex][columnIndex])}
    </td>
  );
};

export default Td;
