module.exports = class commandStructure {
    constructor (name, category, aliases) {
        this.name = name;
        this.category = category;
        this.aliases = aliases;
    }
};