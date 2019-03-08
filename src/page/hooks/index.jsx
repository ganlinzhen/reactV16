import React, { useEffect, useState } from 'react'

// 自定义hook
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    console.log('hook组件 render')
    setIsOnline(true)
    return () => {
      console.log('hook组件 卸载')
    };
  });

  return isOnline;
}
// 使用自定义hook
function FriendListItem() {
  const isOnline = useFriendStatus();
  const [ number, changeNumber ] = useState(0)

  function add () {
    changeNumber(number + 1)
  }

  useEffect(() => {
    console.log('hooks componentDidMount')
  }, [0]);

  useEffect(() => {
    console.log('hooks render')
  });
  
  return (
    <>
      <input type="text" value={number} onChange={() => {}}/><button onClick={add}>点一点加1</button>
      <li style={{ color: isOnline ? 'green' : 'black' }}>
        'zhenganlin'
      </li>
    </>
  );
}
export default FriendListItem