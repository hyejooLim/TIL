import React from "react";

class App extends React.Component { // App 클래스는 react component를 상속받음
  state = {
    number: 0
  }

  add = () => {
    this.setState(current => ({number: current.number + 1}));
  }

  minus = () => {
    this.setState(current => ({number: current.number - 1}));
  }

  render() {
    return (
      <div>
        <h1>The number is: {this.state.number}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </div>

    ) 
  }
}

export default App;