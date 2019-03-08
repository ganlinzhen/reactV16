import React, { Component } from 'react'
import Child from './child'

export const Mycontext = React.createContext({
  userName: 'zhenganlin',
  changeUserName: () => {}
});

class Parent extends Component {
  constructor(){
    super()
    this.state = {
      number: 0,
      context: {
        userName: 'zhenganlin',
        changeUserName: this.changeUserName
      }
    }
  }
  static getDerivedStateFromProps (preProps, preState) {
    console.log('getDeriveStateFromProps周期', preProps, preState)
    // return {
    //   number: 2
    // }
  }
  changeUserName = (name) => {
    this.setState((preState) => {
      console.log(preState)
      return {
        context: Object.assign({}, preState.context, {userName: name}),
      }
    })
  }
  handleClick = () => {
    this.setState(preState => ({
      number: preState.number + 1
    }))
  }
  render () {
    return (
      <div>
        <h1>我是父组件，内部定义了 Mycontext.Provider</h1>
        <h5>{this.state.number}</h5>
        <button onClick={this.handleClick}>计算器</button>
        <h3>当前的用户名是: {this.state.context.userName}</h3>
        <Mycontext.Provider value={this.state.context}>
          <Child />
        </Mycontext.Provider>
      </div>
    )
  }
}
export default Parent