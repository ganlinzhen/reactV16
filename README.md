# REACT16 新特性总结

##### 起因：（由于之前使用react导致好多用法还是保持原来的习惯，希望通过此次总结能将react16的新特性引用到实际工作中。）

> ### 生命周期

废弃的周期：componentWillMount、componentWillReceiveProps、componentWillUpdate

新增周期：getDerivedStateFromProps、getSnapshotBeforeUpdate

react15的生命

![react15生命周期](/Users/ganlinzhen/Desktop/笔记/images/react15生命周期.jpg)



React16 的生命周期：![1652a030ed1506e0 ](/Users/ganlinzhen/Desktop/笔记/images/1652a030ed1506e0.jpeg)

##### 生命周期主要的变化 getDerivedStateFromProps 替代了componentWillMount、componentWillReceiveProps，并且setState的时候 也会执行。

##### getDerivedStateFromProps 的返回值是新的state对象。

##### 用他的时候要小心，不要有副作用，最好是纯函数。因为现在是无论是state改变还是props改变，都会执行。

```
 static getDerivedStateFromProps(props, state) {
    if ( props.name !== state.name ) {
      return {
        name: props.name,
        list: null
      };
    }
    return null;
  }
```

> ### render 函数的返回值(数组或字符串)

```jsx
class LiArray extends Component {
  render () {
    return [
      <li>可以返回数组</li>,
      <li>可以返回字符串</li>,
      <li>可以返回字符串</li>
    ]
  }
}
// 与上面类似的也可以用组件替换 或者 用空标签 <></>
class LiArray extends Component {
  render () {
    return (
        <React.Fragment>// <></>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
    )
  }
}
class LiArray extends Component {
  render () {
    return 'my name is zhenganlin'
  }
}

```

> ### Error Boundary 组件（用来捕获子组件的render错误）

```jsx
// 新增 componentDidCatch 钩子函数
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
```

> ### Portal(插槽)

优点：（可用于弹框，对话框，tips组件）

1.样式上使一些弹框组件直接放在根节点上，避免了z-index 错乱的问题。

2.组件关系上保留了当前组件的关系

3.dom事件机制上，也保留了原来的关系，插槽子组件的事件可以传给父组件。

```jsx
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
```

##### react 本身自带类似与vue的slot功能(具名插槽)

```jsx
class Layout extends Component {
    render(){
        return (
            <div>
                <h1>{this.props.head}</h1>
                <h2>{this.props.body}</h2>
                <h3>{this.props.foot}</h3>
            </div>
        )
    } 
}
<Layout head={<Header />} body={<Body />} foot={<Foot />}/>
```

##### react 中全局组件的方法。(见实例)

```jsx
ReactDOM.render(React.createElement(GlobalAlert, props), targetDiv);
```



> ### code spliting && 异步加载

1.路由级的异步加载

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));

// 路由 
<Route exact path="/render" component={OtherComponent} />
```

2.组件级的异步加载(原理是  componentDidCatch )

react.lazy() 配合 Suspense 组件，Suspense子树中只要存在还没回来的Lazy组件，就走 fallback 指定的内容。这样可以 提升到任意祖先级的loading

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

##### 3.组件内部的异步操作加载（Suspense的未来）

```jsx
import React, {Suspense} from 'react';

import {unstable_createResource as createResource} from 'react-cache';

const getList = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve('Morgan');
  }, 1000);
})

const resource = createResource(getName);

const Greeting = () => {
  return <div>hello {resource.read()}</div>
};

const SuspenseDemo = () => {
  return (
    <Suspense fallback={<div>loading...</div>} >
      <Greeting />
    </Suspense>
  );
};
```



之前，只要有 AJAX 这样的异步操作，就必须要用两次渲染来显示 AJAX 结果，这就需要用组件的 state 来存储 AJAX 的结果，用 state 又意味着要把组件实现为一个 class。总之，我们需要做这些：

1. 实现一个 class；
2. class 中需要有 state；
3. 需要实现 componentDidMount 函数；
4. render 必须要根据 `this.state` 来渲染不同内容。

Suspense 被推出之后，可以极大地减少异步操作代码的复杂度。不需要做上面这些杂事，只要一个函数形式组件就足够了。



> ### fiber 与 stack 

老版本：https://claudiopro.github.io/react-fiber-vs-stack-demo/stack.html

新版本：https://claudiopro.github.io/react-fiber-vs-stack-demo/fiber.html



> ### React.memo

》》React.memo() 和 PureComponent 很相似，它帮助我们控制何时重新渲染组件。

组件仅在它的 props 发生改变的时候进行重新渲染。通常来说，在组件树中 React 组件，只要有变化就会走一遍渲染流程。但是通过 PureComponent 和 React.memo()，我们可以仅仅让某些组件进行渲染。

```jsx
React.memo(Child1);
```



> ### Context

以前的用法：

```jsx
// 父组件里面声明： childContextTypes属性 与 getChildContext方法
  // 声明Context对象属性
  static childContextTypes = {
    propA: PropTypes.string,
    methodA: PropTypes.func
  }
  
  // 返回Context对象，方法名是约定好的
  getChildContext () {
    return {
      propA: 'propA',
      methodA: () => 'methodA'
    }
  }
// 子组件里面声明：
static contextTypes = {
   propA: PropTypes.string
    
}
// 然后子组件就可以使用 this.context 获取context属性
```

现在的用法：

```jsx
// 第一步：React.createContext创建一个context对象。
const ThemeContext = React.createContext('light');

// 父组件使用 provider 
class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
// 子组件使用 Consumer组件
function Child () {
    return (
        MyContext2.Consumer
    	<MyContext.Consumer>
          {value => /* render something based on the context value */}
        </MyContext.Consumer>
    )
}
// 或者在子组件中使用 static contextType = MyContext 然年子组件就可以使用 this.context
class MyClass extends React.Component {
  static contextType = MyContext
  componentDidMount() {
    let value = this.context;
  }
  render() {
    let value = this.context;
  }
}
```

类似与redux的用法：

```jsx
// 第一步：定义state 与 reducer
const Mycontext = React.createContext({
    userName: 'zhenganlin'，
    changeUserName: () => {}
});
class Parent extends React.Component {
  constructor(){
  	super()
    this.state = {
    	context: {
            userName: 'zhenganlin'，
    		changeUserName: this.changeUserName
     	}      
    }
  }
  changeUserName = (name) => {
      this.setState((preState) => {
          context: Objec.assign({}, preState.contex, {name: name})
      })
  }
  render() {
    return (
      <Mycontext.Provider value={this.state.context}>
        <Toolbar />
      </Mycontext.Provider>
    );
  }
}
class Child extends React.Component {
    render() {
        return (
          <Mycontext.Consumer>
                {
                    (contex) => { <button onClick={contex.changeUserName('小红')}></button> }
                }
          </Mycontext.Consumer>
        );
    }
}
```

使用的注意事项：

```jsx
// value 值不能使用字面量定义
class App extends React.Component {
  render() {
    return (
      <Provider value={{something: 'something'}}>
        <Toolbar />
      </Provider>
    );
  }
}
```

> ### refs 的用法与新功能

```jsx
/* 之前的用法 */
Class Parent extends Component {
    consturctor () {
        super()
        this.MyChild = null
    }
    render () {
        <Child ref={ref => {this.MyChild = ref}}/>
    }
}
/* 新的用法 */
Class Parent extends Component {
    consturctor () {
        super()
        this.MyChild = React.createRef()
    }
    render () {
        <Child ref={this.MyChild}/>
    }
}
```

##### 新增的 React.forwardRef ()： 之前ref只能在父组件中拿到子组件的实例或者dom元素。通过React.forwardRef 可以跨层级拿到子组件内部的 实例或者dom

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

> ### React Hooks

#### 函数式组件与类组件的区别

1.类组件除了多出了生命周期、内部状态state之外 与 函数式组件基本相同，没有太大差别。

2.还有一个不同的地方是：类组件的props信息前置、函数组件的props信息后置。

3.函数组件可以理解成 class组件的 render 函数

#### state hook(让函数组件拥有state)

```jsx
import React, { useState } from 'react';

function Example(props) {
    const [count, setCount] = useState(0);
    const [name, changeName] = useState('小红');
    
    return (
       <div>
         <p>You clicked {count} times</p>
         <button onClick={() => setCount(count + 1)}> Click me </button>
      </div>
   );  
 }


// **注意 useState 不能使用if条件语句
const Counter = () => {
    const [count, setCount] = useState(0);
    if (count % 2 === 0) {
        const [foo, updateFoo] = useState('foo');
    }
    const [bar, updateBar] = useState('bar');
  ...
}
// 因为每次渲染 函数组件都会重新执行，不能保存state。所以state是存在与React中的。只用第一次渲染的时候回初始化state的值，之后每次都是从React内存中取值。所以每一次 useState 调用对应内存记录上一个位置，而且是按照顺序来记录的。React 不知道你把 useState 等 Hooks API 返回的结果赋值给什么变量，但是它也不需要知道，它只需要按照 useState 调用顺序记录就好了。
```

#### effect Hook（让函数拥有生命周期）

```jsx
//1. useEffect 每次渲染完（render）之后都会执行。相当于 componentDidMount + componentDidUpdata + componentWillUnmount
// useEffect 可以有多个会依次执行。
import { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
    
  useEffect(() => {
    document.name = `Count: ${count}`;
  });
    
  useEffect(() => {
      .......
    document.title = `Count: ${count}`;
  });

  return (
    <div>
       <div>{count}</div>
       <button onClick={() => setCount(count + 1)}>+</button>
       <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
};

//2. useEffect(function(){}, [ 第二个参数 ]) 的第二个参数如果发生变化才会，才会触发该hook
// 所以可以通过参数设为常量来模拟componentDidMount只在第一渲染的时候执行一次。
// 第二个参数也可以是pros或state。类似与 vue 中的 watch
useEffect(() => {
   document.title = `Count: ${count}`;
}, [11111]);

//3. 区分 componentWillUnMount
useEffect(() => {
   document.title = `Count: ${count}`;
    // 一下代码组件卸载阶段才会执行。
    return function () {
        websocket.close()
    }
}, [123123]);


```

#### context hook

```jsx
const ThemedPage = () => {
    const theme = useContext(ThemeContext);
    
    return (
       <div>
            <Header color={theme.color} />
            <Content color={theme.color}/>
            <Footer color={theme.color}/>
       </div>
    );
};
```

##### 自定义hook

1. 以use开头2.里面用到了其他hook

```jsx
import React, { useState, useEffect } from 'react';
// 自定义hook
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
// 使用自定义hook
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}

// 总结： hook 的实现更加方便的实现了，不同组件之间的逻辑共享。
// 如果上面的内容用class实现 

class XXX extend Component {
    state = {
        isOnline: false
    }
    handleStatusChange (xxx) {
        this.setState({
           isOnline: xxx
        })
    }
    componentDidMount =()=> {
        ChatAPI.subscribeToFriendStatus(friendID, this.handleStatusChange);
    }
    componentWillUnmount = () => {
        ChatAPI.unsubscribeFromFriendStatus(friendID, this.handleStatusChange);
    }
    render () {
        XXXXXXX
    }
}
```

