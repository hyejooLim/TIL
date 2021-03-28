import React, { useContext, memo } from 'react';
import { TableContext } from './MineFind';
import Td from './Td';

const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(TableContext);

  return (
    <tr>
      {Array(tableData[0].length)
        .fill()
        .map((td, i) => (
          <Td rowIndex={rowIndex} columnIndex={i} />
        ))}
    </tr>
  );
});

export default Tr;
