"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var signalr_connection_base_1 = require('./signalr.connection.base');
var broadcast_event_listener_1 = require('../eventing/broadcast.event.listener');
var connection_status_1 = require('./connection.status');
var Subject_1 = require('rxjs/Subject');
var SignalRConnection = (function (_super) {
    __extends(SignalRConnection, _super);
    function SignalRConnection(jConnection, jProxy, zone) {
        _super.call(this);
        this._jProxy = jProxy;
        this._jConnection = jConnection;
        this._zone = zone;
        this._errors = this.wireUpErrorsAsObservable();
        this._status = this.wireUpStatusEventsAsObservable();
    }
    Object.defineProperty(SignalRConnection.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnection.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    SignalRConnection.prototype.start = function () {
        var _this = this;
        var $promise = new Promise(function (resolve, reject) {
            _this._jConnection.start().done(function () {
                var results = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    results[_i - 0] = arguments[_i];
                }
                resolve(results);
            })
                .fail(function (err) {
                reject(err);
            });
        });
        return $promise;
    };
    SignalRConnection.prototype.stop = function () {
        this._jConnection.stop();
    };
    Object.defineProperty(SignalRConnection.prototype, "id", {
        get: function () {
            return this._jConnection.id;
        },
        enumerable: true,
        configurable: true
    });
    SignalRConnection.prototype.invoke = function (method) {
        var _this = this;
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        if (method == null)
            throw new Error('SignalRConnection: Failed to invoke. Argument \'method\' can not be null');
        console.debug("SignalRConnection. Start invoking '" + method + "'...");
        var $promise = new Promise(function (resolve, reject) {
            (_a = _this._jProxy).invoke.apply(_a, [method].concat(parameters))
                .done(function (result) {
                console.debug("'" + method + "' invoked succesfully. Resolving promise...");
                resolve(result);
                console.debug("Promise resolved.");
            })
                .fail(function (err) {
                console.debug("Invoking '" + method + "' failed. Rejecting promise...");
                reject(err);
                console.debug("Promise rejected.");
            });
            var _a;
        });
        return $promise;
    };
    SignalRConnection.prototype.wireUpErrorsAsObservable = function () {
        var _this = this;
        var sError = new Subject_1.Subject();
        this._jConnection.error(function (error) {
            _this._zone.run(function () {
                sError.next(error);
            });
        });
        return sError;
    };
    SignalRConnection.prototype.wireUpStatusEventsAsObservable = function () {
        var _this = this;
        var sStatus = new Subject_1.Subject();
        var connStatusNames = ['starting', 'received', 'connectionSlow', 'reconnecting', 'reconnected', 'stateChanged', 'disconnected'];
        connStatusNames.forEach(function (statusName) {
            _this._jConnection[statusName](function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _this._zone.run(function () {
                    sStatus.next(new connection_status_1.ConnectionStatus(statusName));
                });
            });
        });
        return sStatus;
    };
    SignalRConnection.prototype.listen = function (listener) {
        var _this = this;
        if (listener == null)
            throw new Error('Failed to listen. Argument \'listener\' can not be null');
        console.log("SignalRConnection: Starting to listen to server event with name " + listener.event);
        this._jProxy.on(listener.event, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _this._zone.run(function () {
                var casted = null;
                if (args.length === 0)
                    return;
                casted = args[0];
                console.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
                listener.next(casted);
                console.log('listener next() called.');
            });
        });
    };
    SignalRConnection.prototype.listenFor = function (event) {
        if (event == null || event === '')
            throw new Error('Failed to listen. Argument \'event\' can not be empty');
        var listener = new broadcast_event_listener_1.BroadcastEventListener(event);
        this.listen(listener);
        return listener;
    };
    SignalRConnection.prototype.onBroadcastEventReceived = function (listener) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
        var casted = null;
        if (args.length > 0)
            casted = args[0];
        this._zone.run(function () {
            listener.next(casted);
        });
        console.log('listener next() called.');
    };
    return SignalRConnection;
}(signalr_connection_base_1.SignalRConnectionBase));
exports.SignalRConnection = SignalRConnection;
//# sourceMappingURL=signalr.connection.js.map