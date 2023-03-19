// const express=require('express')

// const purchaseController = require('../controller/purchase');

// const authenticatemiddleware = require('../middleware/auth');

// const router = express.Router();

// router.get('/premiummembership', authenticatemiddleware.authenticate,purchaseController. purchasepremium)

// router.post('/updatetransactionstatus', authenticatemiddleware.authenticate,purchaseController.updateTransactionStatus)

// module.exports = router;

const express = require('express');

const purchaseController = require('../controllers/purchase');
const userauthentication= require('../middleware/auth');

const router = express.Router();

router.get('/purchase/premiummembership',userauthentication.authenticate, purchaseController.purchasepremium );

router.post('/purchase/updatetransactionstatus', userauthentication.authenticate, purchaseController.updateTransactionStatus);

module.exports = router;