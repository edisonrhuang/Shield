const BaseEvent = require('../../structures/BaseEvent');

module.exports = class ErrorEvent extends BaseEvent {
    constructor() {
        super('error');
    }

    run() {
        return console.error();
    }
}