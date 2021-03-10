const React = require('react');
const ReactDom = require('react-dom');

const WordRelay = require('./끝말잇기/WordRelay');
const NumberBaseball = require('./숫자야구/NumberBaseball');

ReactDom.render(<NumberBaseball />, document.querySelector('#root'));