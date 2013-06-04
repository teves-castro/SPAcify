﻿
///<reference path="../../Scripts/typings/breeze/breeze.Knockout.d.ts" />
///<reference path="../../Scripts/typings/knockout/knockout.d.ts" />
///<reference path="../../Scripts/typings/breeze/breeze.d.ts" />
interface EntityBase extends breeze.Entity {
	Selected: KnockoutObservableBool;
}

interface KnockoutObservableEntityBase extends KnockoutObservableEntity {
    (): EntityBase;
    (value: EntityBase): void;

    subscribe(callback: (newValue: EntityBase) => void , target?: any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: EntityBase, topic?: string);
}

interface KnockoutObservableEntityBaseArray extends KnockoutObservableEntityArray {
    (): EntityBase[];
    (value: EntityBase[]): void;

    subscribe(callback: (newValue: EntityBase[]) => void , target?: any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: EntityBase[], topic?: string);
}

interface KnockoutObservableStatic {
    (value: EntityBase): KnockoutObservableEntityBase;
    new (value: EntityBase): KnockoutObservableEntityBase;
}

