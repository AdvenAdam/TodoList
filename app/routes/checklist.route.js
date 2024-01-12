const authMiddleware = require('../../util/authMiddleware.js');
module.exports = (app) => {
    const checklist = require('../controllers/checklist.controller.js');
    var router = require('express').Router();

    router.get('/', authMiddleware, checklist.findAll);

    router.post('/', authMiddleware, checklist.create);

    router.delete('/:id', authMiddleware, checklist.delete);

    app.use('/api/checklist', router);
};
