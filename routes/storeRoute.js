const express = require('express');
const { GetStores, AddStore } = require('../controllers/storeController');

const router = express.Router();
const {  GetStoresValidation, AddStoreValidation } = require('../middleware/validation/store.validation');
const { authenticateAIMSAdminToken, authenticateToken } = require('../middleware/validation/auth.validation');


router.post('/AddStore', authenticateAIMSAdminToken,  AddStoreValidation, AddStore);
router.get('/GetStores', authenticateToken, GetStoresValidation, GetStores); // SignedIn Token need sto be pass

module.exports = router;