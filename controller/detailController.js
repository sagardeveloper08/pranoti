const Detail = require('../models/detailSchema');


exports.createDetail = async (req, res) => {
    try {
        
        const newDetail = await Detail.create(req.body);
        res.status(201).json(newDetail);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create detail' });
    }
};

// Get all details
exports.getAllDetails = async (req, res) => {
    try {
        const details = await Detail.find();
        res.json(details);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch details' });
    }
};

// Get a detail by ID
exports.getDetailById = async (req, res) => {
    try {
        const detail = await Detail.findById(req.params.id);
        if (!detail) {
            return res.status(404).json({ error: 'Detail not found' });
        }
        res.json(detail);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch detail' });
    }
};

// Update a detail by ID
exports.updateDetail = async (req, res) => {
    try {
        const updatedDetail = await Detail.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDetail) {
            return res.status(404).json({ error: 'Detail not found' });
        }
        res.json(updatedDetail);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update detail' });
    }
};

// Delete a detail by ID
exports.deleteDetail = async (req, res) => {
    try {
        const deletedDetail = await Detail.findByIdAndDelete(req.params.id);
        if (!deletedDetail) {
            return res.status(404).json({ error: 'Detail not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete detail' });
    }
};
