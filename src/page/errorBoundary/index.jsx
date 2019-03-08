import React, { Component } from 'react'

/**
 * 错误边界组件
 */ 
class ErrorBoundary extends Component {
  constructor () {
    super()
    this.state = {
      hasError: false
    }
  }
  componentDidCatch = (err, info) => {
    this.setState({
      hasError: true
    })
    console.log('内部组件报错了', err, info)
  }
  render () {
    if (this.state.hasError) {
      return <h1>内部组件报错了</h1>
    }
    return this.props.children
  }
}

class NormalComponent extends Component {
  constructor () {
    super()
    this.state = {
      list: [1,2,3,4,5,6]
    }
  }
  change = () => {
    this.setState({
      list: null
    })
  }
  render () {
    return (
      <div>
        <ul>
          {
            this.state.list.map((item, index) => (
              <li key={index}>计数{item}</li>
            ))
          }
        </ul>
        <button onClick={this.change}>报错按钮</button>
      </div>
    )
  }
}

function TestErroComponent () {
  return (
    <ErrorBoundary>
      <NormalComponent/>
    </ErrorBoundary>
  )
}

export default TestErroComponent