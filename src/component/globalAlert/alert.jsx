import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class GlobalAlert extends Component {
  static defaultProps = {
    title: '我是标题', // 标题
    content: '我是全局弹窗哦！', // 内容
  }
  constructor(props) {
    super(props)
    this.state = {
      show: true
    }
  }
  render () {
    let { title, content } = this.props
    return (
      <div className="globalAlert" style={{display: this.state.show?'block':'none'}}>
        <div className="indexAlertContent">
            <div className="head">{title}</div>
            <div className="detial">
              {content}
            </div>
          </div>
      </div>
    )
  }
}

GlobalAlert.newInstance = function newInstance(properties) {
  let props = properties || {};
  let div = document.createElement('div');

  document.body.appendChild(div);
  ReactDOM.render(React.createElement(GlobalAlert, props), div);

  return {
      destroy() {
          ReactDOM.unmountComponentAtNode(div);
          document.body.removeChild(div);
      }
  }
}

export default GlobalAlert
