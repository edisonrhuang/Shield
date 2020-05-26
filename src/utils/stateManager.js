const { EventEmitter } = require('events');
const connection = require('../database/connection');

class stateManager extends EventEmitter {
    constructor(option) {
        super(option);
        connection.then(connection => this.connection = connection).catch(err => console.log(err));
    }
}

module.exports = new stateManager();