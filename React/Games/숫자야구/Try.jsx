import React, { memo } from 'react';

const Try = memo(({ element }) => {
  return (
    <li>
      <div>{element.try}</div>
      <div>{element.result}</div>
    </li>
  );
});

export default Try;
