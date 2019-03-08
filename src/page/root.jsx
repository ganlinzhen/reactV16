import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import RenderNew from '@/page/render'
import TestErroComponent from '@/page/errorBoundary'
import ProtalComponent from '@/page/portal/index'
import ContextCom from '@/page/context/index'
import FunctionClass from '@/page/functionOrClass/index'
import ReactMemo from '@/page/reactMemo/index'
import ReactHook from '@/page/hooks/index'

import '@/common/index.css'

class Root extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'zhenganlin'
    }
  }
  render () {
    return (
      <BrowserRouter>
        <div>
          <div className="head">
            <Link to="render">1.Render返回值&nbsp;&nbsp;&nbsp;&nbsp;</Link>
            <Link to="errorBoundary">2.error boundary 组件&nbsp;&nbsp;&nbsp;&nbsp;</Link>
            <Link to="protalComponent">3.Portal 插槽的使用&nbsp;&nbsp;&nbsp;&nbsp;</Link>
            <Link to="contextCom">4.Context Api的使用&nbsp;&nbsp;&nbsp;&nbsp;</Link>
            <Link to="functionClass">5. function 组件与class组件的区别&nbsp;&nbsp;&nbsp;&nbsp;</Link>
            <Link to="reactMemo">6. React.memo()的作用&nbsp;&nbsp;&nbsp;&nbsp;</Link>
            <Link to="reactHook">7. hook 使用&nbsp;&nbsp;&nbsp;&nbsp;</Link>
          </div>
          <Switch>
            <Route exact path="/render" component={RenderNew} />
            <Route exact path="/errorBoundary" component={TestErroComponent} />
            <Route exact path="/protalComponent" component={ProtalComponent} />
            <Route exact path="/contextCom" component={ContextCom} />
            <Route exact path="/functionClass" component={FunctionClass} />
            <Route exact path="/reactMemo" component={ReactMemo} />
            <Route exact path="/reactHook" component={ReactHook} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Root