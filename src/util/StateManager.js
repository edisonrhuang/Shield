const { EventEmitter } = require('events');
const connection = require('../database/connection');

class StateManager extends EventEmitter {
    constructor(option) {
        super(option);
        connection.then(connection => this.connection = connection).catch(err => console.log(err));
    }
}

module.exports = new StateManager();