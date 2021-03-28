import React, { useState, useRef, useEffect } from 'react';
import './style.css';

const rspCoords = {
  가위: "0",
  바위: "-120px",
  보: "-258px",
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const getComputerScore = (imgCoord) => {
  return Object.entries(rspCoords).find((v) => {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [imgCoord, setImgCoord] = useState(rspCoords.가위);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const interval = useRef();

  // imgCoord가 바뀔 때마다 useEffect 실행 
  // 두 번째 인자가 빈 배열이면 componentDidMount 역할
  // 두 번째 인자에 값이 들어 있으면 componentDidMount + componentDidUpdate 역할 
  useEffect(() => { 
    interval.current = setInterval(changeHand, 500);
    return () => { // componentWillUnmount 역할
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  const changeHand = () => {
    if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.바위);
    } else if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.가위);
    }
  };

  const onClick = (choice) => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const computerScore = scores[getComputerScore(imgCoord)];
    const diff = myScore - computerScore;
    if (diff === 0) {
      setResult("비겼습니다!");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다!");
      setScore((prevScore) => {
        return prevScore + 1;
      });
    } else {
      setResult("졌습니다!");
      setScore((prevScore) => {
        return prevScore - 1;
      });
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 500);
    }, 1000);
  };

  return (
    <>
      <div
        className='img'
        style={{
          background: `url(https://cdn.crowdpic.net/list-thumb/thumb_l_FED9D585F6FD3A143D0489163E355924.png) ${imgCoord} 0`,
        }}
      />
      <button className='siser' onClick={() => onClick("가위")}>
        가위
      </button>
      <button className='rock' onClick={() => onClick("바위")}>
        바위
      </button>
      <button className='paper' onClick={() => onClick("보")}>
        보
      </button>
      <div>{result}</div>
      <div>현재 점수: {score}</div>
    </>
  );
};

export default RSP;
