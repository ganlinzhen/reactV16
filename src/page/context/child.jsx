import React, { Component } from 'react'
import { Mycontext } from './index'

class Child extends Component {
  constructor () {
    super()
    this.state = {
      name: ''
    }
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  componentWiilReceiveProps () {
    console.log('componentWiilReceiveProps')
  }
  render() {
    return (
      <Mycontext.Consumer>
        {
          (context) => (
            <div style={{border: '1px solid blue'}}>
              <h1>我是子组件,内部定义了consumer</h1>
              <h3>当前用户名是：{context.userName}</h3>
              <button onClick={ () => context.changeUserName('小红' + Math.random()) }>把名字变成小红</button>
            </div>
          )
        }
      </Mycontext.Consumer>
    )
  }
}
export default Child