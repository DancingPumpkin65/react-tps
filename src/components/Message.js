import React from 'react';

function Dkahel() {
  return <h2>SALAM</h2>;
}

function Kharej() {
  return <h2>LAY3AWEN</h2>;
}

function Message(props) {
  return props.isLoggedIn ? <Dkahel /> : <Kharej />;
}

export default Message;
