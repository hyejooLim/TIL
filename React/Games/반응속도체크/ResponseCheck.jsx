const React = require('react');
const { Component } = require('react');

class ResponseCheck extends Component {
  state = {
    status: 'waiting',
    message: '화면을 클릭하면 시작합니다.',
    result: [],
  };

  timer;
  startTime;
  endTime;

  onClickScreen = () => {
    const { status, message, result } = this.state;
    if (status === 'waiting') {
      this.setState(() => {
        return {
          status: 'ready',
          message: '초록색이 나오면 클릭하세요.',
        };
      });
      this.timer = setTimeout(() => {
        this.startTime = new Date(); // 초록색 화면이 나온 시간 측정

        this.setState({
          status: 'now',
          message: '지금 클릭하세요.',
        });
      }, Math.floor(Math.random() * 1000) + 2000); // 2 ~ 3 초
    } else if (status === 'ready') {
      clearTimeout(this.timer);

      this.setState({
        status: 'waiting',
        message: '너무 성급하시군요.',
      });
    } else if (status === 'now') {
      this.endTime = new Date(); // 내가 클릭한 시간 측정

      this.setState((prevState) => {
        return {
          status: 'waiting',
          message: '잘 하셨어요!',
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: [],
    });
  };

  responseAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>
          평균 시간 : {result.reduce((a, b) => a + b) / result.length}ms
        </div>
        <button onClick={this.onReset}>Reset</button>
      </>
    );
  };

  render() {
    const { status, message, result } = this.state;
    return (
      <>
        <div id="screen" className={status} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.responseAverage()}
      </>
    );
  }
}

module.exports = ResponseCheck;
