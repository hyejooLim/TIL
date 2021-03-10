const React = require('react');
const { useState, useRef } = require('react');
const Try = require('./Try');

// 숫자 4개를 중복 없이 랜덤으로 뽑는 함수
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const num = candidate.splice(Math.ceil(Math.random() * (7 - i)), 1)[0];
    array.push(num);
  }
  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [elements, setElements] = useState([]);
  const inputNumber = useRef(null);

  onSubmit = (e) => {
    e.preventDefault();
    console.log(answer);
    // 숫자를 맞췄으면
    if (value === answer.join('')) {
      setResult('홈런 ⚾');
      setElements((prevElements) => {
        return [...prevElements, { try: value, result: '홈런  ⚾' }];
      });
      alert('게임을 다시 시작합니다.');
      setResult('');
      setValue('');
      setAnswer(getNumbers());
      setElements([]);
    } else {
      const inputArray = value.split('').map((x) => parseInt(x));
      let strike = 0;
      let ball = 0;
      // 10번 이상 틀리면
      if (9 <= elements.length) {
        setResult(`10번 이상 틀렸습니다. 답은 ${answer.join('')}였습니다!`);
        alert('게임을 다시 시작합니다.');
        setResult('');
        setValue('');
        setAnswer(getNumbers());
        setElements([]);
      } else {
        for (let i = 0; i < 4; i++) {
          if (inputArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(inputArray[i])) {
            ball++;
          }
        }
        setValue('');
        setElements((prevElements) => {
          return [
            ...prevElements,
            { try: value, result: `${strike} 스트라이크 ${ball} 볼 입니다.` },
          ];
        });
      }
    }
    inputNumber.current.focus();
  };

  onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmit}>
        <input
          ref={inputNumber}
          type="number"
          maxLength={4}
          value={value}
          onChange={onChange}></input>
        <button type="submit">Enter</button>
      </form>
      <div>시도: {elements.length}</div>
      <ul>
        {elements.map((element, idx) => {
          return <Try key={idx} element={element} idx={idx} />;
        })}
      </ul>
    </>
  );
};

module.exports = NumberBaseball;
