import React, { Component } from 'react'

// 父容器组件
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0, number: 0};
    this.handleClick = this.handleClick.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
  }

  handleClick() {
    // This will fire when the button in Child is clicked,
    // updating Parent's state, even though button
    // is not direct descendant in the DOM.
    this.setState(prevState => ({
      number: prevState.number + 1
    }));
  }
  handleClick1() {
    // This will fire when the button in Child is clicked,
    // updating Parent's state, even though button
    // is not direct descendant in the DOM.
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
        <div>
          <p>Number of clicks: {this.state.clicks}</p>
          <button onClick={this.handleClick}>父组件的Click+1</button>
          <button onClick={this.handleClick1}>父组件的Click改变自身state</button>
          <Child number={this.state.number}/>
          <WrappedChild number={this.state.number}/>
        </div>
    );
  }
}

function Child (props) {
    console.log('子组件Child:render')
    return (
      <div className="modal">
        <h5>我是子组件Child</h5>
        <p>{props.number}</p>
        <button>Click</button>
      </div>
    )
}
function Child1 (props) {
  console.log('子组件WrappedChild:render')
  return (
    <div className="modal">
      <h5>我是子组件WrappedChild</h5>
      <p>{props.number}</p>
      <button>Click</button>
    </div>
  )
}

const WrappedChild = React.memo(Child1);

export default Parent