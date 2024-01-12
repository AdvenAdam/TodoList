module.exports = (sequelize, Sequelize) => {
    const checklistItem = sequelize.define('checklistitem', {
        itemtitle: {
            type: Sequelize.STRING
        },
        checked: {
            type: Sequelize.BOOLEAN
        }
    });
    return checklistItem;
};
