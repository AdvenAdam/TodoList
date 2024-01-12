const db = require('../models');
const Checklist = db.Checklist;

exports.findAll = async (req, res) => {
    try {
        const data = await Checklist.findAll({ where: { id: req.params.id } });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving checkChecklistDatas.'
        });
    }
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
        return;
    }

    // Create a Checklist
    const checklistData = {
        title: req.body.title,
        checked: false
    };

    // Save Checklist in the database
    Checklist.create(checklistData)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Checklist.'
            });
        });
};

// Delete a Checklist twith the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Checklist.destroy({
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'checklist was deleted successfully!'
                });
            } else {
                res.send({
                    message: `Cannot delete checklist with id=${id}. Maybe checklist was not found!`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete checklist with id=' + id
            });
        });
};
