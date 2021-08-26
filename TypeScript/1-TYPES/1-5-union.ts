{
  // Union Types: OR
  type Direction = 'up' | 'right' | 'down' | 'left';
  function move(direction: Direction) {
    console.log(direction);
  }
  move('right'); // 'up' | 'right' | 'down' | 'left' 중 하나만 전달 가능

  type TileSize = 8 | 16 | 32;
  const tile: TileSize = 16;

  // ex) function: login -> success, fail
  type SuccessState = {
    response: {
      body: string;
    };
  };
  type FailState = {
    reason: string;
  };
  type LoginState = SuccessState | FailState;

  function login(): LoginState {
    return {
      response: {
        body: 'logged in!',
      },
    };
  }

  // 타입에 따라 다른 로그 출력
  function printLoginState(state: LoginState) {
    if ('response' in state) {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`🥲 ${state.reason}`);
    }
  }
}
