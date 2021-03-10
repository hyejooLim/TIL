const React = require('react');
const { memo } = require('react');

const Try = memo(({ element }) => {
  return (
    <li>
      <div>{element.try}</div>
      <div>{element.result}</div>
    </li>
  );
});

module.exports = Try;
