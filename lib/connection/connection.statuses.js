"use strict";
var connection_status_1 = require('./connection.status');
var ConnectionStatuses = (function () {
    function ConnectionStatuses() {
    }
    Object.defineProperty(ConnectionStatuses, "starting", {
        get: function () {
            return ConnectionStatuses.statuses[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "received", {
        get: function () {
            return ConnectionStatuses.statuses[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "connectionSlow", {
        get: function () {
            return ConnectionStatuses.statuses[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "reconnecting", {
        get: function () {
            return ConnectionStatuses.statuses[3];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "reconnected", {
        get: function () {
            return ConnectionStatuses.statuses[4];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "stateChanged", {
        get: function () {
            return ConnectionStatuses.statuses[5];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "disconnected", {
        get: function () {
            return ConnectionStatuses.statuses[6];
        },
        enumerable: true,
        configurable: true
    });
    ConnectionStatuses.statuses = [
        new connection_status_1.ConnectionStatus("starting"),
        new connection_status_1.ConnectionStatus("received"),
        new connection_status_1.ConnectionStatus("connectionSlow"),
        new connection_status_1.ConnectionStatus("reconnecting"),
        new connection_status_1.ConnectionStatus("reconnected"),
        new connection_status_1.ConnectionStatus("stateChanged"),
        new connection_status_1.ConnectionStatus("disconnected"),
    ];
    return ConnectionStatuses;
}());
exports.ConnectionStatuses = ConnectionStatuses;
//# sourceMappingURL=connection.statuses.js.map