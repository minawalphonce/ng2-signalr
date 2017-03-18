import { SignalRConnectionBase } from './connection/signalr.connection.base';
import { SignalRConfiguration } from './signalr.configuration';
import { SignalRConnection } from './connection/signalr.connection';
import { NgZone, Injectable } from '@angular/core';
import { ConnectionOptions } from './connection/connection.options';

@Injectable()
export class SignalR {
    private _configuration: SignalRConfiguration;
    private _zone: NgZone;
    private _jHubConnectionFn: any;

    public constructor(configuration: SignalRConfiguration, zone: NgZone, jHubConnectionFn: Function) {
        this._configuration = configuration;
        this._zone = zone;
        this._jHubConnectionFn = jHubConnectionFn;
    }

    public connect(options?: ConnectionOptions): Promise<SignalRConnectionBase> {


        let $promise = new Promise<SignalRConnection>((resolve, reject) => {


            let configuration = this.merge(options ? options : {});

            console.log(`Connecting with...`);
            console.log(`configuration:[url: '${configuration.url}'] ...`);
            console.log(`configuration:[hubName: '${configuration.hubName}'] ...`);
            try {
                let serialized = JSON.stringify(configuration.qs);
                console.log(`configuration:[qs: '${serialized}'] ...`);
            } catch (err) {}
                        
            // create connection object
            let jConnection = this._jHubConnectionFn(configuration.url);
            jConnection.logging = configuration.logging;
            jConnection.qs = configuration.qs;

            // create a proxy
            let jProxy = jConnection.createHubProxy(configuration.hubName);
            // !!! important. We need to register at least one on function otherwise server callbacks will not work. 
            jProxy.on('noOp', function () { });
           
            let hubConnection = new SignalRConnection(jConnection, jProxy, this._zone);
            // start the connection
            console.log('Starting connection ...');
            
            jConnection.start({ withCredentials: false })
                .done(function () {
                    console.log('Connection established, ID: ' + jConnection.id);
                    console.log('Connection established, Transport: ' + jConnection.transport.name);
                    resolve(hubConnection);
                })
                .fail(function (error: any) {
                    console.log('Could not connect');
                    reject('Failed to connect. Error: ' + error.message); // ex: Error during negotiation request.
                });
        });

        return $promise;
    }

    private merge(overrides: ConnectionOptions): SignalRConfiguration {
        let merged: SignalRConfiguration = new SignalRConfiguration(); 
        merged.hubName = overrides.hubName || this._configuration.hubName;
        merged.url = overrides.url || this._configuration.url;
        merged.qs = overrides.qs || this._configuration.qs;
        merged.logging = this._configuration.logging;
        return merged;
    }
}
