import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Ball from './Ball';
import './style.css';

const getNumbers = () => {
  console.log("getNumbers");
  const arr = [];
  for (let i = 0; i < 7; i++) {
    const randomNum = Math.ceil(Math.random() * 44);
    if (arr.includes(randomNum)) {
      --i;
      continue;
    }
    arr.push(randomNum);
  }
  return arr;
};

const Lotto = () => {
  // useMemo: []가 바뀌기 전까지 함수의 리턴값 기억 (함수의 재렌더링 방지)
  const lottoNumbers = useMemo(() => getNumbers(), []);
  const [numbers, setNumbers] = useState(lottoNumbers);
  const [winBalls, setWinballs] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeout = useRef([]);

  // 처음과 timeout.current가 바뀔 때에만 실행
  useEffect(() => {
    console.log("useEffect");
    showNumbers();

    return () => {
      console.log("componentWillUnmount");
      timeout.current.forEach((v) => clearTimeout(v));
    };
  }, [timeout.current]);

  const showNumbers = () => {
    console.log("showNumbers");
    for (let i = 0; i < numbers.length - 1; i++) {
      timeout.current[i] = setTimeout(() => {
        setWinballs((prevWinballs) => [...prevWinballs, numbers[i]]);
      }, 1000 * (i + 1));
    }
    timeout.current[6] = setTimeout(() => {
      setBonus(numbers[6]);
      setRedo(true);
    }, 7000);
  };

  // useCallback: 함수 자체를 기억
  // 자식 컴포넌트에게 함수를 props로 전달하려면 그 함수에 useCallback을 적용해야 함 (자식 컴포넌트의 재런더링 방지)
  const onClick = useCallback(() => {
    console.log(numbers); // 두 번째 인자가 빈 배열이면 처음의 numbers를 계속 출력
    setNumbers(getNumbers());
    setWinballs([]);
    setBonus(null);
    setRedo(false);
    timeout.current = []; // 이 때 timeout.current 값 바뀜
  }, [numbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div>
        {winBalls.map((winBall, idx) => (
          <Ball key={idx} winBall={winBall} />
        ))}
      </div>
      <div>보너스</div>
      {bonus && <Ball winBall={bonus} />}
      {redo && <button onClick={onClick}>다시 추첨</button>}
    </>
  );
};

export default Lotto;
