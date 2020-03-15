const express = require('express')
const router = express.Router()

const ctrlUser = require('../controllers/user.controller')

const jwtHelper = require('../config/jwtHelper')

// router.post('/register', ctrlUser.register)
// router.post('/authenticate', ctrlUser.authenticate)
// router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile)


//////////////////////////////////////////////////////////////////////////////////////////

router.post('/login', ctrlUser.login)
router.post('/signUp', ctrlUser.signUp)
router.post('/makeInquiry', ctrlUser.makeInquiry)

router.get('/getLoadedUser/:RegNo', ctrlUser.getLoadedUser)
router.get('/getLoadedUserFromSLIITdb/:RegNo', ctrlUser.getLoadedUserFromSLIITdb)
router.get('/getAccountBal/:RegNo', ctrlUser.getAccountBal)
router.get('/getInquiryData/:RegNo', ctrlUser.getInquiryData)
router.get('/getPassengersNotices', ctrlUser.getPassengersNotices)

router.get('/getUserLocation', ctrlUser.getUserLocation)
router.get('/getDriversNotices', ctrlUser.getDriversNotices)

router.post('/makeInquiryReplys', ctrlUser.makeInquiryReplys)
router.post('/makeDeposit_payments', ctrlUser.makeDeposit_payments)
router.post('/makePublicNotices', ctrlUser.makePublicNotices)
router.post('/registerBuses', ctrlUser.registerBuses)
router.post('/makeFuelExpenses', ctrlUser.makeFuelExpenses)
router.post('/makeRepairExpenses', ctrlUser.makeRepairExpenses)
router.get('/getAllIncomes', ctrlUser.getAllIncomes)

module.exports = router