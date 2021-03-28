import React, { Component } from 'react';
import Ball from './Ball';

const getNumbers = () => {
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

class Lotto extends Component {
  state = {
    numbers: getNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeout = [];
  // 컴포넌트가 처음 렌더링된 후 실행 
  componentDidMount() {
    this.showNumbers();
  }

  // winBalls가 초기화될 때만 실행
  componentDidUpdate() {
    if (this.state.winBalls.length === 0) {
      this.showNumbers();
    }
  }

  // 컴포넌트가 사라질 때 timeout 동작 멈춤
  componentWillUnmount() {
    this.timeout.forEach((v) => {
      clearTimeout(v);
    });
  }

  showNumbers = () => {
    console.log(this.state.numbers);
    const { numbers } = this.state;
    for (let i = 0; i < numbers.length - 1; i++) {
      this.timeout[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, numbers[i]],
          };
        });
      }, 1000 * (i + 1));
    }
    this.timeout[6] = setTimeout(() => {
      this.setState({
        bonus: numbers[6],
        redo: true,
      });
    }, 7000);
  };

  onClick = () => {
    this.setState({
      numbers: getNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeout = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div className='number'>
          {winBalls.map((winBall, idx) => (
            <Ball key={idx} winBall={winBall} />
          ))}
        </div>
        <div>보너스</div>
        {bonus && <Ball winBall={bonus} />}
        {redo && <button onClick={this.onClick}>다시 추첨</button>}
      </>
    );
  }
}

export default Lotto;
