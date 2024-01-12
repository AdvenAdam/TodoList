module.exports = (sequelize, Sequelize) => {
    const checklistItem = sequelize.define('checklistitem', {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.BOOLEAN
        }
    });
    return checklistItem;
};
