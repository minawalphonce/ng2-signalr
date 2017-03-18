"use strict";
var signalr_configuration_1 = require('./signalr.configuration');
var signalr_connection_1 = require('./connection/signalr.connection');
var core_1 = require('@angular/core');
var SignalR = (function () {
    function SignalR(configuration, zone, jHubConnectionFn) {
        this._configuration = configuration;
        this._zone = zone;
        this._jHubConnectionFn = jHubConnectionFn;
    }
    SignalR.prototype.connect = function (options) {
        var _this = this;
        var $promise = new Promise(function (resolve, reject) {
            var configuration = _this.merge(options ? options : {});
            console.log("Connecting with...");
            console.log("configuration:[url: '" + configuration.url + "'] ...");
            console.log("configuration:[hubName: '" + configuration.hubName + "'] ...");
            try {
                var serialized = JSON.stringify(configuration.qs);
                console.log("configuration:[qs: '" + serialized + "'] ...");
            }
            catch (err) { }
            var jConnection = _this._jHubConnectionFn(configuration.url);
            jConnection.logging = configuration.logging;
            jConnection.qs = configuration.qs;
            var jProxy = jConnection.createHubProxy(configuration.hubName);
            jProxy.on('noOp', function () { });
            var hubConnection = new signalr_connection_1.SignalRConnection(jConnection, jProxy, _this._zone);
            console.log('Starting connection ...');
            jConnection.start({ withCredentials: false })
                .done(function () {
                console.log('Connection established, ID: ' + jConnection.id);
                console.log('Connection established, Transport: ' + jConnection.transport.name);
                resolve(hubConnection);
            })
                .fail(function (error) {
                console.log('Could not connect');
                reject('Failed to connect. Error: ' + error.message);
            });
        });
        return $promise;
    };
    SignalR.prototype.merge = function (overrides) {
        var merged = new signalr_configuration_1.SignalRConfiguration();
        merged.hubName = overrides.hubName || this._configuration.hubName;
        merged.url = overrides.url || this._configuration.url;
        merged.qs = overrides.qs || this._configuration.qs;
        merged.logging = this._configuration.logging;
        return merged;
    };
    SignalR.decorators = [
        { type: core_1.Injectable },
    ];
    SignalR.ctorParameters = function () { return [
        { type: signalr_configuration_1.SignalRConfiguration, },
        { type: core_1.NgZone, },
        { type: Function, },
    ]; };
    return SignalR;
}());
exports.SignalR = SignalR;
//# sourceMappingURL=signalr.js.map