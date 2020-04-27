const express = require('express')
const router = express.Router()

const adminController = require('../controllers/admin_panel.controller')
const paymentController = require('../controllers/payment.controller')

//admin controller routes
router.get('/gettiledata', adminController.getTileData)
router.get('/getincomedata', adminController.getIncomeChartData)
router.get('/getfeedbackdata', adminController.getPassengerFbckChartData)
router.get('/getinquirydata', adminController.getInquiryChartData)

//payment controller routes
router.get('/getaccountdetails', paymentController.getAccountDetails)
router.put('/updateaccountbalance', paymentController.updateAccountBalance)


module.exports = router