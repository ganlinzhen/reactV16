import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import GlobalAlert from '../../component/globalAlert/index'

const modalRoot = document.getElementById('modal-root');

// 插槽组件
class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

// 父容器组件
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0, number: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This will fire when the button in Child is clicked,
    // updating Parent's state, even though button
    // is not direct descendant in the DOM.
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  handlClick2 = () => {
    this.setState(preState => ({
      number: preState.number + 1
    }))
  }

  handlClick3 = () => {
    GlobalAlert.open()
  }
  handlClick4 = () => {
    GlobalAlert.close()
  }

  render() {
    return (
      <>
        <button onClick={this.handlClick3}>全局弹框开启</button>
        <button onClick={this.handlClick4}>全局弹框关闭</button>
        <div onClick={this.handleClick}>
          <p>Number of clicks: {this.state.clicks}</p>
          <button onClick={this.handlClick2}>父组件的Click+1</button>
          <Modal>
            <Child number={this.state.number}/>
          </Modal>
        </div>
      </>
    );
  }
}

class Child extends Component{
  constructor(props) {
    super()
    console.log('child组件的属性', props)
  }
  // The click event on this button will bubble up to parent,
  // because there is no 'onClick' attribute defined
  render () {
    return (
      <div className="modal">
        <h5>我是子组件</h5>
        <p>{this.props.number}</p>
        <button>Click</button>
      </div>
    )
  }
}

export default Parent