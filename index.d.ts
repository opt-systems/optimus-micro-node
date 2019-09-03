/// <reference types="node" />

import { IncomingMessage, ServerResponse } from 'http';

declare function optimusMicro(): any;

declare namespace optimusMicro {
  interface Request extends IncomingMessage {}
  interface Response extends ServerResponse {
    send(content: string): any;
  }
}

export = optimusMicro;