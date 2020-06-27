const BaseEvent = require('../../structures/BaseEvent');

module.exports = class Warn extends BaseEvent {
    constructor() {
        super('warn');
    }

    run() {
        return console.warn();
    }
}