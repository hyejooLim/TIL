import React, { useState, useRef } from 'react';
import './style.css';

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("화면을 클릭하면 시작합니다.");
  const [result, setResult] = useState([]);

  // 값이 바뀌지만 재렌더링되는 것 방지
  const timer = useRef();
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 나오면 클릭하세요.");

      timer.current = setTimeout(() => {
        startTime.current = new Date(); // 초록색 화면이 나온 시간 측정
        setState("now");
        setMessage("지금 클릭하세요.");
      }, Math.floor(Math.random() * 1000) + 2000); // 2 ~ 3 초
    } else if (state === "ready") {
      clearTimeout(timer.current);
      setState("waiting");
      setMessage("너무 성급하시군요.");
    } else if (state === "now") {
      endTime.current = new Date(); // 내가 클릭한 시간 측정
      setState("waiting");
      setMessage("잘 하셨어요!");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };

  const onReset = () => {
    setResult([]);
    setMessage('화면을 클릭하면 시작합니다.');
  };

  const responseAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>
          평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms
        </div>
        <button onClick={onReset}>Reset</button>
      </>
    );
  };

  return (
    <>
      <div id='screen' className={state} onClick={onClickScreen}>
        {message}
      </div>
      {responseAverage()}
    </>
  );
};

export default ResponseCheck;
