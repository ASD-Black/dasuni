const express = require('express')
const router = express.Router()

const adminController = require('../controllers/admin_panel.controller')
const paymentController = require('../controllers/payment.controller')
const loginController = require('../controllers/login.controller')
const noticeController = require('../controllers/notice.controller')
const inquiryController = require('../controllers/inquiry.controller')
const reportController = require('../controllers/report.controller')

//login
router.post('/login',loginController.login);

//admin controller routes
router.get('/gettiledata', adminController.getTileData)
router.get('/getincomedata', adminController.getIncomeChartData)
router.get('/getfeedbackdata', adminController.getPassengerFbckChartData)
router.get('/getmonthlyincomedata', adminController.getCurrentIncomeData)
router.get('/getexpenditurepatterns', adminController.getExpenditurePatterns)

//payment controller routes
router.get('/getaccountdetails', paymentController.getAccountDetails)
router.put('/updateaccountbalance', paymentController.updateAccountBalance)

//notice controller routes
router.post('/addnotice', noticeController.addNotice)
router.get('/getnotices', noticeController.getNotices)
router.put('/updatenotice', noticeController.updateNotice)
router.get('/deletenotice', noticeController.deleteNotice)

//inquiry controller routes
router.post('/addreply', inquiryController.addReply)
router.get('/getinquiries', inquiryController.getInquiries)
router.get('/getreplies', inquiryController.getInqReplies)
router.put('/updateinquiry', inquiryController.updateInquiry)

//report controllers
router.get('/getprogressreport', reportController.progressReportData)
router.get('/getexpensereport', reportController.expenseReportData)

module.exports = router