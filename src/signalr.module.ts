import { NgModule, ModuleWithProviders, NgZone, OpaqueToken } from '@angular/core';
import { SignalR } from './signalr';
import { SignalRConfiguration } from './signalr.configuration';
import 'signalr-no-jquery';

declare var hubConnection: any;



const SIGNALR_CONFIGURATION = new OpaqueToken('SIGNALR_CONFIGURATION');

export function createSignalr(configuration: SignalRConfiguration, zone: NgZone) {

    let jConnectionFn = getJConnectionFn();

    return new SignalR(configuration, zone, jConnectionFn);
}

function getJConnectionFn(): any {
    let hubConnectionFn = hubConnection;
    if (hubConnectionFn == null) throw new Error('Signalr failed to initialize. Script \'jquery.signalR.js\' is missing. Please make sure to include \'jquery.signalR.js\' script.');
    return hubConnectionFn;
}

@NgModule({
    providers: [{
        provide: SignalR,
        useValue: SignalR
    }]
})
export class SignalRModule {
    public static forRoot(getSignalRConfiguration: Function): ModuleWithProviders {
        return {
            ngModule: SignalRModule,
            providers: [
                {
                    provide: SIGNALR_CONFIGURATION,
                    useFactory: getSignalRConfiguration
                },
                {
                    provide: SignalR,
                    useFactory: (createSignalr),
                    deps: [SIGNALR_CONFIGURATION, NgZone]
                }
            ],
        };
    }
}