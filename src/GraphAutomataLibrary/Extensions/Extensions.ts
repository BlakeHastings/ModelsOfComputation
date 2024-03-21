export {};

declare global {
    interface Array<T> {
        first(): T;
        last(): T;
        middle(): T;
    }    
}

Array.prototype.first = function (this) {
    return this[0];
};

Array.prototype.middle = function (this) {
    return this[Math.ceil(this.length / 2) - 1];
}

Array.prototype.last = function (this) {
    return this[this.length -1];
};