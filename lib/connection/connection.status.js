"use strict";
var ConnectionStatus = (function () {
    function ConnectionStatus(name) {
        if (name == null || name === "")
            throw new Error("Failed to create ConnectionStatus. Argument 'name' can not be null or empty.");
        this._name = name;
    }
    Object.defineProperty(ConnectionStatus.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    ConnectionStatus.prototype.toString = function () {
        return this._name;
    };
    ConnectionStatus.prototype.equals = function (other) {
        if (other == null)
            return false;
        return this._name === other.name;
    };
    return ConnectionStatus;
}());
exports.ConnectionStatus = ConnectionStatus;
//# sourceMappingURL=connection.status.js.map