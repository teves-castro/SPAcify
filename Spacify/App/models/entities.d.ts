
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
interface Blog extends EntityBase {
    id : KnockoutObservableString;
    name : KnockoutObservableString;
}

interface KnockoutObservableBlog extends KnockoutObservableEntity {
    (): Blog;
    (value: Blog): void;

    subscribe(callback: (newValue: Blog) => void , target?: any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: Blog, topic?: string);
}

interface KnockoutObservableBlogArray extends KnockoutObservableEntityArray {
    (): Blog[];
    (value: Blog[]): void;

    subscribe(callback: (newValue: Blog[]) => void , target?: any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: Blog[], topic?: string);
}

interface KnockoutObservableStatic {
    (value: Blog): KnockoutObservableBlog;
    new (value: Blog): KnockoutObservableBlog;
}




