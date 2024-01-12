const authMiddleware = require('../../util/authMiddleware.js');
const checklistItem = require('../controllers/checklist.item.controller.js');

module.exports = (app) => {
    var router = require('express').Router();

    router.get('/:id/item', authMiddleware, checklistItem.findAll);

    router.post('/:id/item', authMiddleware, checklistItem.create);

    router.get('/:id/item/:checkListItemId', authMiddleware, checklistItem.findOne);

    router.put('/:id/item/:checkListItemId', authMiddleware, checklistItem.update);

    router.delete('/:id/item/:checkListItemId', authMiddleware, checklistItem.delete);

    router.put('/:id/item/rename/:checkListItemId', authMiddleware, checklistItem.update);

    app.use('/api/checklist', router);
};
