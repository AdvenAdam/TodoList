const db = require('../models');
const Checklist = db.Checklist;

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

// Update a Checkli tby the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    Checklist.update(req.body, {
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'checklist was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update checklist with id=${id}. Maybe checklist was not found or req.body is empty!`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating checklist with id=' + id
            });
        });
};
