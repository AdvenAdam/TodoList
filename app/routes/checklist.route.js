module.exports = (app) => {
    const checklist = require('../controllers/checklist.controller.js');

    var router = require('express').Router();

    router.get('/', checklist.findAll);

    router.post('/', checklist.create);

    router.delete('/:id', checklist.delete);

    app.use('/api/checklist', router);
};
