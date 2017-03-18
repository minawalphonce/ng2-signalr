import { SignalRConnectionBase } from './connection/signalr.connection.base';
import { SignalRConfiguration } from './signalr.configuration';
import { NgZone } from '@angular/core';
import { ConnectionOptions } from './connection/connection.options';
export declare class SignalR {
    private _configuration;
    private _zone;
    private _jHubConnectionFn;
    constructor(configuration: SignalRConfiguration, zone: NgZone, jHubConnectionFn: Function);
    connect(options?: ConnectionOptions): Promise<SignalRConnectionBase>;
    private merge(overrides);
}
