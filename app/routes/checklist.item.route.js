module.exports = (app) => {
    const checklistItem = require('../controllers/checklist.item.controller.js');

    var router = require('express').Router();

    router.get('/:id/item', checklistItem.findAll);

    router.post('/:id/item', checklistItem.create);

    router.get('/:id/item/:chekListItemId', checklistItem.findOne);

    router.put('/:id/item/:chekListItemId', checklistItem.update);

    router.delete('/:id/item/:chekListItemId', checklistItem.delete);

    router.put('/:id/item/rename/:chekListItemId', checklistItem.update);

    app.use('/api/checklist', router);
};
