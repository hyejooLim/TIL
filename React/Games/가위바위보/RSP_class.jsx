import React, { Component } from 'react';

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

class RSP extends Component {
  state = {
    imgCoord: rspCoords.가위,
    score: 0,
    result: "",
  };

  // 비동기 처리를 해줌 
  componentDidMount() {
    this.interval = setInterval(this.changeHand, 500);
  }

  // 비동기 정리를 해줌
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { imgCoord } = this.state; // 클로저 문제 해결 
    if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    } else if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    }
  };

  onClick = (choice) => {
    clearInterval(this.interval);
    const { imgCoord } = this.state;
    const myScore = scores[choice];
    const computerScore = scores[getComputerScore(imgCoord)];
    const diff = myScore - computerScore;
    if (diff === 0) {
      this.setState({
        result: "비겼습니다!",
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "이겼습니다!",
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "졌습니다!",
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 500);
    }, 1000);
  };

  render() {
    const { imgCoord, score, result } = this.state;
    return (
      <>
        <div
          className='img'
          style={{
            background: `url(https://cdn.crowdpic.net/list-thumb/thumb_l_FED9D585F6FD3A143D0489163E355924.png) ${imgCoord} 0`,
          }}
        />
        <button className='siser' onClick={() => this.onClick("가위")}>
          가위
        </button>
        <button className='rock' onClick={() => this.onClick("바위")}>
          바위
        </button>
        <button className='paper' onClick={() => this.onClick("보")}>
          보
        </button>
        <div>{result}</div>
        <div>현재 점수: {score}</div>
      </>
    );
  }
}

export default RSP;
