import { Observable } from "rxjs/Observable";
import { BroadcastEventListener } from "../eventing/broadcast.event.listener";
import { ConnectionStatus } from "./connection.status";
export declare abstract class SignalRConnectionBase {
    readonly abstract status: Observable<ConnectionStatus>;
    readonly abstract errors: Observable<any>;
    abstract invoke(method: string, ...parameters: any[]): Promise<any>;
    abstract listen<T>(listener: BroadcastEventListener<T>): void;
    abstract listenFor<T>(listener: string): BroadcastEventListener<T>;
    abstract stop(): void;
    readonly abstract id: string;
    abstract start(): Promise<any>;
}
