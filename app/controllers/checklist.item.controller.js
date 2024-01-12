const db = require('../models');
const ChecklistData = db.Checklistitem;

exports.findAll = async (req, res) => {
    try {
        const data = await ChecklistData.findAll({ where: { checkList_id: req.params.id } });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving checkChecklistDatas.'
        });
    }
};
exports.findOne = async (req, res) => {
    try {
        const { id, chekListItemId } = req.params;
        const data = await ChecklistData.findOne({ where: { checkList_id: chekListItemId, id } });
        if (data) {
            return res.send(data);
        }
        return res.status(404).send({ message: `Cannot find checklist with id=${id}.` });
    } catch (err) {
        const id = req.params.id;
        return res.status(500).send({ message: `Error retrieving checklist with id=${id}` });
    }
};
exports.update = async (req, res) => {
    try {
        const { id, chekListItemId } = req.params;

        const [num] = await ChecklistData.update(req.body, {
            where: { id: chekListItemId, checkList_id: id }
        });

        if (num === 1) {
            res.send({
                message: 'checklistData was updated successfully.'
            });
        } else {
            res.send({
                message: `Cannot update checklistData with id=${id}. Maybe checklistData was not found or req.body is empty!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: 'Error updating checklistData with id=' + id
        });
    }
};

exports.create = async (req, res) => {
    try {
        // Validate request
        if (!req.body.title) {
            return res.status(400).send({ message: 'Content can not be empty!' });
        }

        // Create a Checklist
        const reqData = {
            title: req.body.title,
            checked: false,
            checkList_id: req.body.id
        };

        // Save Checklist in the database
        const data = await ChecklistData.create(reqData);

        res.send(data);
    } catch (err) {
        res.status(500).send({ message: err.message || 'Some error occurred while creating the Checklist.' });
    }
};

// Delete a Checklist with the specified id in the request
exports.delete = async (req, res) => {
    try {
        const { id, chekListItemId } = req.params;
        const num = await Checklist.destroy({ where: { id: chekListItemId, checkList_id: id } });

        if (num == 1) {
            res.send({ message: 'checklist was deleted successfully!' });
        } else {
            res.send({ message: `Cannot delete checklist with id=${id}. Maybe checklist was not found!` });
        }
    } catch (err) {
        res.status(500).send({ message: 'Could not delete checklist with id=' + id });
    }
};
