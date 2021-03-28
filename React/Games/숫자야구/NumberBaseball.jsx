import React, { memo, useState, useRef } from 'react';
import Try from './Try';

// 숫자 4개를 중복없이 랜덤으로 뽑음 
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const num = candidate.splice(Math.ceil(Math.random() * (7 - i)), 1)[0];
    array.push(num);
  }
  return array;
}

// memo: 컴포넌트 재렌더링 방지
const NumberBaseball = memo(() => {
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [elements, setElements] = useState([]);
  const inputNumber = useRef(null);

 const onSubmit = (e) => {
    e.preventDefault();
    console.log(answer);
    // 숫자를 맞췄으면
    if (value === answer.join('')) {
      alert('홈런 ⚾');
      setValue('');
      setAnswer(getNumbers());
      setElements([]);
    } else {
      const inputArray = value.split('').map((x) => parseInt(x));
      let ball = 0;
      let strike = 0;
      
      // 10번 안에 맞추지 못하면
      if (9 <= elements.length) {
        alert(`답은 ${answer.join('')} 입니다!`);
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

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
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
});

export default NumberBaseball;
