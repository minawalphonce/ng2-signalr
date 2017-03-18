import { ModuleWithProviders, NgZone } from '@angular/core';
import { SignalR } from './signalr';
import { SignalRConfiguration } from './signalr.configuration';
export declare function createSignalr(configuration: SignalRConfiguration, zone: NgZone): SignalR;
export declare class SignalRModule {
    static forRoot(getSignalRConfiguration: Function): ModuleWithProviders;
}
