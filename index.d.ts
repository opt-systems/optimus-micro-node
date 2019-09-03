// <reference types="node" />

import { IncomingMessage, ServerResponse } from 'http';

interface UsrDefinedObj { [fieldName: string]: any } 

declare function optimusMicro(...args: any): any;

declare namespace optimusMicro {
  interface Request extends IncomingMessage {
    body: string,
    params: UsrDefinedObj
  }
  interface Response extends ServerResponse {
    send(content: string): void;
  }
}

export = optimusMicro;
