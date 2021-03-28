import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import GameMatcher from './gameMatcher';

// 동적 라우트 매칭 
const Navigator = () => {
  return (
    <BrowserRouter>
    <div className='nav'>
      <Link to="/game/number-baseball?hello=lilac&bye=coin">숫자야구</Link> {/* query string: 부가적인 정보 나타냄 */}
      <Link to="/game/word-relay">끝말잇기</Link>
      <Link to="/game/rock-scissors-paper">가위바위보</Link>
      <Link to="/game/lotto">로또 추점기</Link>
      <Link to="/game/response-check">반응속도체크</Link>
      <Link to="/game/tic-tac-toe">틱택토</Link>
      <Link to="/game/mine-find">지뢰찾기</Link>
    </div>
      <div>
        <Route path="/game/:name" component={GameMatcher} /> 
      </div>
    </BrowserRouter>
  )
};

export default Navigator;