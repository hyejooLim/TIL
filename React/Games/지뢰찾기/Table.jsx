import React, { useContext, memo } from 'react';
import { TableContext } from './MineFind';
import Tr from './Tr';

const Table = memo(() => {
  const { tableData } = useContext(TableContext);

  return (
    <table>
      {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />)}
    </table>
  );
});

export default Table;
