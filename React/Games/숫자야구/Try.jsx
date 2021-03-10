const React = require('react');

const Try = ({ element }) => {
  return (
    <li>
      <div>{element.try}</div>
      <div>{element.result}</div>
    </li>
  );
};

module.exports = Try;
