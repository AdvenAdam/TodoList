const ChecklistItem = require('./checklist.item.model');

module.exports = (sequelize, Sequelize) => {
    const Checklist = sequelize.define('checklist', {
        name: {
            type: Sequelize.STRING
        }
    });
    return Checklist;
};
