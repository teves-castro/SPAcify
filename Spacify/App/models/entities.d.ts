
///<reference path="../../Scripts/typings/knockout/knockout.d.ts" />
///<reference path="../../Scripts/typings/breeze/breeze.d.ts" />
interface EntityBase extends breeze.Entity {
	selected: KnockoutObservable<boolean>;
}
interface Blog extends EntityBase {
    id : KnockoutObservable<string>;
    name : KnockoutObservable<string>;
}



