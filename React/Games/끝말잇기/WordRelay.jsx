const React = require('react');
const { useState, useRef } = require('react');

const WordRelay = () => {
  const [word, setWord] = useState('죠르디');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const textInput = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    // word의 마지막 글자가 value의 첫글자와 같다면
    if (word[word.length - 1] === value[0] && 1 < value.length) {
      setWord(value);
      setValue('');
      setResult('⭕');
    } else {
      setValue('');
      setResult('❌');
    }
    textInput.current.focus();
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmit}>
        <input
          ref={textInput}
          type="text"
          value={value}
          onChange={onChange}></input>
        <button type="submit">Enter</button>
      </form>
      <span>{result}</span>
    </>
  );
};

module.exports = WordRelay;
