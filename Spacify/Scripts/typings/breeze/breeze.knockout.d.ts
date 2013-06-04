/// <reference path="breeze.d.ts" />
/// <reference path="..\knockout\knockout.d.ts" />

interface KnockoutObservableEntity extends KnockoutObservableBase {
    (): breeze.Entity;
    (value: breeze.Entity): void;

    subscribe(callback: (newValue: breeze.Entity) => void , target?: any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: breeze.Entity, topic?: string);
}

interface KnockoutObservableStatic {
    (value: breeze.Entity): KnockoutObservableEntity;

    new (value: breeze.Entity): KnockoutObservableEntity;
}

interface KnockoutObservableEntityArray extends KnockoutObservableArray {
    (): breeze.Entity[];
    (value: breeze.Entity[]): void;

    subscribe(callback: (newValue: breeze.Entity[]) => void , target?: any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: breeze.Entity[], topic?: string);
}
