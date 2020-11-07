const express = require('express');
const { GetStores, AddStore } = require('../controllers/storeController');

const router = express.Router();
const {  GetStoresValidation, AddStoreValidation } = require('../middleware/validation/store.validation');

router.get('/GetStores',GetStoresValidation, GetStores);
router.post('/AddStore', AddStoreValidation, AddStore);

module.exports = router;