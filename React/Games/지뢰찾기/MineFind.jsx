import React, {
  useReducer,
  useMemo,
  createContext,
  useEffect,
  memo
} from 'react';
import Form from './Form';
import Table from './Table';
import './style.css';

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
  data: {
    row: 0,
    column: 0,
    mine: 0,
  },
  stop: true,
  result: '',
  openCell: 0,
  timer: 0,
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
        data: {
          row: action.row,
          column: action.column,
          mine: action.mine,
        },
        tableData: plantMine(action.row, action.column, action.mine),
        stop: false,
        openCell: 0,
        timer: 0,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const visited = [];
      let countOpenCell = 0;
      const checkAround = (row, column) => {
        if (
          row < 0 ||
          tableData.length <= row ||
          column < 0 ||
          tableData[0].length <= column
        ) {
          return;
        }
        if (
          [
            CODE.FLAG,
            CODE.FLAG_MINE,
            CODE.QUESTION,
            CODE.QUESTION_MINE,
          ].includes(tableData[row][column])
        ) {
          return;
        }
        // 이미 방문한 지점은 무시
        if (visited.includes(row + ',' + column)) {
          return;
        } else {
          visited.push(row + ',' + column);
        }
        // 주변 지뢰 개수 세기
        let around = [tableData[row][column - 1], tableData[row][column + 1]];
        // 첫 번째 행이 아니라면 
        if (tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][column - 1],
            tableData[row - 1][column],
            tableData[row - 1][column + 1]
          );
        }
        // 마지막 행이 아니라면 
        if (tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][column - 1],
            tableData[row + 1][column],
            tableData[row + 1][column + 1]
          );
        }
        const count = around.filter((v) =>
          [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
        ).length;
        console.log(around, count);
        // 주변 칸에 지뢰가 없다면
        if (count === 0) {
          let next = [];
          if (0 < row) {
            next.push([row - 1, column - 1]);
            next.push([row - 1, column]);
            next.push([row - 1, column + 1]);
          }
          next.push([row, column - 1]);
          next.push([row, column + 1]);
          if (row < tableData.length - 1) {
            next.push([row + 1, column - 1]);
            next.push([row + 1, column]);
            next.push([row + 1, column + 1]);
          }
          next.forEach((n) => {
            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
              checkAround(n[0], n[1]);
            }
          });
        }
        if (tableData[row][column] === CODE.NORMAL) {
          countOpenCell += 1;
        }
        console.log(countOpenCell, state.openCell);
        tableData[row][column] = count;
      };
      checkAround(action.row, action.column);
      // 모든 칸을 열었다면 
      if (
        state.data.row * state.data.column - state.data.mine ===
        state.openCell + countOpenCell
      ) {
        state.result = `You win in a ${state.timer} sec! 👏🏻`;
        state.stop = true;
      }
      return {
        ...state,
        tableData,
        openCell: state.openCell + countOpenCell,
        result: state.result,
        stop: state.stop,
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
        timer: state.timer + 1,
      };
    default:
      return state;
  }
};

const MineFine = memo(() => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, stop, timer, result } = state;

  useEffect(() => {
    let timer = 0;
    if (stop === false) {
      timer = setInterval(() => {
        dispatch({ type: TIMER_WORK });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [stop]);

  // value 값이 바뀔 때마다 컴포넌트가 재렌더링되는 것 방지 (성능 저하 방지)
  const value = useMemo(() => ({ tableData, stop, dispatch }), [
    tableData,
    stop,
  ]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div className='timer'>{timer}초</div>
      <Table />
      {result && <div className='result'>{result}</div>}
    </TableContext.Provider>
  );
});

export default MineFine;
