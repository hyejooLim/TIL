const React = require('react');
const ReactDom = require('react-dom');

const WordRelay = require('./끝말잇기/WordRelay');
const NumberBaseball = require('./숫자야구/NumberBaseball');
const ResponseCheck = require('./반응속도체크/ResponseCheck');

ReactDom.render(<ResponseCheck />, document.querySelector('#root'));