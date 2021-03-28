import React, { useEffect, useReducer } from 'react';
import Table from './Table';
import './style.css';

const initialState = {
  winner: '',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  turn: 'O',
  currentCell: [-1, -1],
};

export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const SET_WINNER = 'SET_WINNER';
export const RESET_GAME = 'RESET_GAME';

// 액션이 디스패치되면 reducer 실행 
const reducer = (state, action) => {
  switch (action.type) {
    case CLICK_CELL:
      const tableData = [...state.tableData];
      tableData[action.row][action.column] = state.turn;
      return {
        ...state,
        tableData,
        currentCell: [action.row, action.column],
      };
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };
    case RESET_GAME:
      return {
        ...state,
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        turn: 'O',
        currentCell: [-1, -1],
      }
    default:
      return state;
  }
};

const TicTacToe = () => {
  // useReducer: state를 한 곳에서 관리 
  const [state, dispatch] = useReducer(reducer, initialState);
  const { winner, tableData, turn, currentCell } = state;

  useEffect(() => {
    const [row, column] = currentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    } else if (tableData[0][column] === turn && tableData[1][column] === turn && tableData[2][column] === turn) {
      win = true;
    } else if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    } else if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }

    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
        let full = true;
        tableData.forEach(row => {
          row.forEach(cell => {
            if (!cell) {
              full = false;
            }
          })
        });
        // 무승부
        if (full) {
          alert('무승부입니다.');
          dispatch({ type: RESET_GAME });
        } else {
          dispatch({ type: CHANGE_TURN });
        }
    }
  }, [currentCell]);

  return (
    <>
      <Table tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님이 승리!</div>}
    </>
  );
};

export default TicTacToe;
