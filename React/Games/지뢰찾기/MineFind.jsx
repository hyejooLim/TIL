import React, { useReducer, useMemo, createContext, useRef } from 'react';
import Form from './Form';
import Table from './Table';

// Context 생성(하위 컴포넌트에 일일이 props 전달하지 않아도 됨)
export const TableContext = createContext({
  tableData: [],
  stop: true,
  dispatch: () => {},
});

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0,
};

const initialState = {
  tableData: [],
  stop: true,
  result: '',
  sec: 0,
};

export const TIMER_WORK = 'TIMER_WORK';
export const CLICK_CELL = 'CLICK_CELL';
export const START_GAME = 'START_GAME';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMAL_CELL = 'NORMAL_CELL';

const plantMine = (row, column, mine) => {
  // 지뢰 개수만큼 랜덤 숫자 뽑기
  const arr = Array(row * column)
    .fill()
    .map((v, i) => i);
  const candidate = [];
  while (row * column - mine < arr.length) {
    const randomNum = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
    candidate.push(randomNum);
  }
  // 2차원 배열 초기화
  const tableData = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    tableData.push(rowData);
    for (let j = 0; j < column; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  // 지뢰 심기
  for (let i = 0; i < candidate.length; i++) {
    const x = Math.floor(candidate[i] / column);
    const y = candidate[i] % column;
    tableData[x][y] = CODE.MINE;
  }
  return tableData;
};

// state 처리 함수
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.column, action.mine),
        stop: false,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      // 주변 지뢰 개수 보여주기
      let around = [];
      if (tableData[action.row - 1]) {
        around = around.concat(
          tableData[action.row - 1][action.column - 1],
          tableData[action.row - 1][action.column],
          tableData[action.row - 1][action.column + 1]
        );
      }
      around = around.concat(
        tableData[action.row][action.column - 1],
        tableData[action.row][action.column + 1]
      );
      if (tableData[action.row + 1]) {
        around = around.concat(
          tableData[action.row + 1][action.column - 1],
          tableData[action.row + 1][action.column],
          tableData[action.row + 1][action.column + 1]
        );
      }
      const count = around.filter(v => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
      tableData[action.row][action.column] = count;
      console.log(around, count);
      return {
        ...state,
        tableData,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row][action.column] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        stop: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row][action.column] =
        tableData[action.row][action.column] === CODE.MINE
          ? CODE.FLAG_MINE
          : CODE.FLAG;
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row][action.column] =
        tableData[action.row][action.column] === CODE.FLAG_MINE
          ? CODE.QUESTION_MINE
          : CODE.QUESTION;
      return {
        ...state,
        tableData,
      };
    }
    case NORMAL_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row][action.column] =
        tableData[action.row][action.column] === CODE.QUESTION_MINE
          ? CODE.MINE
          : CODE.NORMAL;
      return {
        ...state,
        tableData,
      };
    }
    case TIMER_WORK:
      return {
        ...state,
        sec: action.sec,
      };
    default:
      return state;
  }
};

const MineFine = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const timer = useRef(null);
  const { tableData, sec, stop, result } = state;

  // value 값이 바뀔 때마다 컴포넌트가 재렌더링되는 것 방지
  const value = useMemo(() => ({ tableData, stop, dispatch }), [
    tableData,
    stop,
  ]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div className='timer'>{sec}초</div>
      <Table />
      {result && <div className='result'>{result}</div>}
    </TableContext.Provider>
  );
};

export default MineFine;
