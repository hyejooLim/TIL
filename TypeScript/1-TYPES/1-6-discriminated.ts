{
  // Discriminated Union
  // 타입마다 동일한 이름의 속성을 가지고 있으므로 구분이 쉬워짐

  type SuccessState = {
    result: 'success';
    response: {
      body: string;
    };
  };
  type FailState = {
    result: 'fail';
    reason: string;
  };
  type LoginState = SuccessState | FailState;

  function login(): LoginState {
    return {
      result: 'success',
      response: {
        body: 'logged in!',
      },
    };
  }

  // 타입에 따라 다른 로그 출력
  function printLoginState(state: LoginState) {
    if (state.result === 'success') {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`🥲 ${state.reason}`);
    }
  }
}
