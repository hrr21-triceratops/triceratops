var ws = new WebSocket('ws://localhost:2400/');

ws.onopen = () => {
  // connection opened
  console.log('WebSocket Open.');
  ws.send('Testing 123'); // send a message
};

ws.onmessage = (e) => {
  // a message was received
  console.log('New Message:', e.data);
  // Add to state's messages array (bind 'this')
  this.setState({messages: (this.state.messages.concat([event.data]))});
};

ws.onerror = (e) => {
  // an error occurred
  console.log('Error:', e.message);
};

ws.onclose = (e) => {
  // connection closed
  console.log('WebSocket Closed.', e.code, e.reason);
};