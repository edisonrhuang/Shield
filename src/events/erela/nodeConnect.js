const BaseEvent = require('../../structures/BaseEvent');

module.exports = class NodeConnectEvent extends BaseEvent {
    constructor() {
        super('nodeConnect');
    }

    run () {
        return console.log('Node: Connected')
    }
};