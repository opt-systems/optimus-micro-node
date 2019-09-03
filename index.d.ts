// <reference types="node" />

import { IncomingMessage, ServerResponse } from 'http';

interface UsrDefinedObj { [fieldName: string]: any } 

declare function optimusMicro(): UsrDefinedObj;

declare namespace optimusMicro {
  interface Request extends IncomingMessage {
    body: string,
    params: UsrDefinedObj
  }
  interface Response extends ServerResponse {
    send(content: string): UsrDefinedObj;
  }
}

export = optimusMicro;
