const express = require('express');
const router = express.Router();
const detailController = require('../controller/detailController');


router.post('/details', detailController.createDetail);

// Get all details
router.get('/details', detailController.getAllDetails);

// Get a detail by ID
router.get('/details/:id', detailController.getDetailById);

// Update a detail by ID
router.put('/details/:id', detailController.updateDetail);

// Delete a detail by ID
router.delete('/details/:id', detailController.deleteDetail);

module.exports = router;