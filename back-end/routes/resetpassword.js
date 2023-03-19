// const express = require('express');

// const resetpasswordController = require('../controller/resetpassword');


// const router = express.Router();

// router.get('/password/updatepassword/:resetpasswordid', resetpasswordController.updatePassword)

// router.get('/password/resetpassword/:id', resetpasswordController.resetPassword)

// router.use('/password/forgotpassword', resetpasswordController.forgotPassword)

// module.exports = router;


const express = require('express');

const passwordControllers = require('../controllers/resetpassword');


const router = express.Router();
router.post('/forgotpassword',passwordControllers.forgotPassword);

router.get('/resetpassword/:id',passwordControllers.resetPassword);

router.get('/updatepassword/:id',passwordControllers.updatePassword);

module.exports = router;