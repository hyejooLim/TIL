import React, { Component } from 'react';
import NumberBaseBall from './숫자야구/NumberBaseball';
import WordRelay from './끝말잇기/WordRelay';
import RSP from './가위바위보/RSP_func';
import Lotto from './로또추첨기/Lotto_func';
import ResponseCheck from './반응속도체크/ResponseCheck';
import TicTacToe from './틱택토/TicTacToe';
import MineFind from './지뢰찾기/MineFind';

class GameMatcher extends Component {
  render() {
    const urlSearchParams = new URLSearchParams(this.props.location.search);
    console.log(urlSearchParams.get('bye')); // 해당 key의 value 값 읽어오기 

    if (this.props.match.params.name === 'number-baseball') {
      return <NumberBaseBall />
    } else if (this.props.match.params.name === 'word-relay') {
      return <WordRelay />
    } else if (this.props.match.params.name === 'rock-scissors-paper') {
      return <RSP />
    } else if (this.props.match.params.name === 'lotto') {
      return <Lotto />
    } else if (this.props.match.params.name === 'response-check') {
      return <ResponseCheck />
    } else if (this.props.match.params.name === 'tic-tac-toe') {
      return <TicTacToe />
    } else if (this.props.match.params.name === 'mine-find') {
      return <MineFind />
    } 
    return (
      <div>not found game</div>
    )
  }
}

export default GameMatcher;