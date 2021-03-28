import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import GameMatcher from './gameMatcher';

// 동적 라우트 매칭 
const Navigator = () => {
  return (
    <BrowserRouter>
    {/* 고정 부분(레이아웃) */}
    <div className='nav'>
      <Link to="/game/number-baseball?hello=lilac&bye=coin">숫자야구</Link> {/* query string: 부가적인 정보 나타냄 */}
      <Link to="/game/word-relay">끝말잇기</Link> 
      <Link to="/game/rock-scissors-paper">가위바위보</Link>
      <Link to="/game/lotto">로또 추점기</Link>
      <Link to="/game/response-check">반응속도체크</Link>
      <Link to="/game/tic-tac-toe">틱택토</Link>
      <Link to="/game/mine-find">지뢰찾기</Link>
    </div>
    {/* 변하는 부분(동적으로 변함) */}
      <div>
        <Route path="/game/:name" component={GameMatcher} /> 
      </div>
    </BrowserRouter>
  )
};

export default Navigator;
