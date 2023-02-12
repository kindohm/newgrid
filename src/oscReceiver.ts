import { OscMessage } from './oscTypes';
// import * as osc from 'osc';

const osc = require('osc');

const defaultPort = 5150;
const port = defaultPort;

let handleMessage : (oscMsg: OscMessage) => void;


export const udpPort = new osc.UDPPort({
  localAddress: '0.0.0.0',
  localPort: port,
  metadata: true,
});

udpPort.on('message', function (oscMsg: OscMessage) {

  handleMessage(oscMsg);
});

const run = (handler : (msg: OscMessage) => void) => {
  handleMessage = handler;
  udpPort.open();
  console.log('osc listening on ', port);
};

export { run };
