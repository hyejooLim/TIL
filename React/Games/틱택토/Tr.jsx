import React from 'react';
import Td from './Td';

const Tr = ({ rowIndex, rowData, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) => (
          <Td
            cellData={rowData[i]}
            rowIndex={rowIndex}
            columnIndex={i}
            dispatch={dispatch}
          />
        ))}
    </tr>
  );
};

export default Tr;
