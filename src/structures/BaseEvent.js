module.exports = class Event {
    constructor (name) {
        this.name = name;
    }

    run() {
        throw new Error(`${this.name} has no run method.`)
    }
};