import React, { useState, useCallback, useContext, memo } from 'react';
import { TableContext, START_GAME } from './MineFind';

const Form = memo(() => {
  const [row, setRow] = useState(10);
  const [column, setColumn] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);

  const onChangeColumn = useCallback((e) => {
    setColumn(e.target.value);
  }, []);

  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  const onClickBtn = useCallback((e) => {
    e.preventDefault();
    dispatch({ type: START_GAME, row, column, mine });
  }, [row, column, mine]);

  return (
    <>
      <input
        type='number'
        placeholder='행'
        value={row}
        onChange={onChangeRow}
      ></input>
      <input
        type='number'
        placeholder='열'
        value={column}
        onChange={onChangeColumn}
      ></input>
      <input
        type='number'
        placeholder='심을 지뢰 개수'
        value={mine}
        onChange={onChangeMine}
      ></input>
      <button type='submit' onClick={onClickBtn}>
        생성
      </button>
    </>
  );
});

export default Form;
