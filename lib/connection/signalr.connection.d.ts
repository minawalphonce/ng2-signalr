import { SignalRConnectionBase } from './signalr.connection.base';
import { Observable } from 'rxjs/Observable';
import { BroadcastEventListener } from '../eventing/broadcast.event.listener';
import { ConnectionStatus } from './connection.status';
import { NgZone } from '@angular/core';
export declare class SignalRConnection extends SignalRConnectionBase {
    private _status;
    private _errors;
    private _jConnection;
    private _jProxy;
    private _zone;
    constructor(jConnection: any, jProxy: any, zone: NgZone);
    readonly errors: Observable<any>;
    readonly status: Observable<ConnectionStatus>;
    start(): Promise<any>;
    stop(): void;
    readonly id: string;
    invoke(method: string, ...parameters: any[]): Promise<any>;
    private wireUpErrorsAsObservable();
    private wireUpStatusEventsAsObservable();
    listen<T>(listener: BroadcastEventListener<T>): void;
    listenFor<T>(event: string): BroadcastEventListener<T>;
    private onBroadcastEventReceived<T>(listener, ...args);
}
