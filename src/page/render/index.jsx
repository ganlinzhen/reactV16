import React, { Component } from 'react'

class RenderNew extends Component {
  constructor () {
    super()
    this.state = {
      name: 'zhenganlin'
    }
  }
  render () {
    return (
      <div>
        <h1>render 函数新特性</h1>
        <ul><LiArray /></ul>
        <h3>
          <Zhenganlin />
        </h3>
      </div>
    )
  }
}

export default RenderNew

class LiArray extends Component {
  render () {
    return [
      <li key='1'>可以返回数组</li>,
      <li key="2">可以返回字符串</li>,
      <li key="3">可以返回字符串</li>
    ]
  }
}
class Zhenganlin extends Component {
  render () {
    return '字符串：my name is zhenganlin'
  }
}