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

module.exports = router