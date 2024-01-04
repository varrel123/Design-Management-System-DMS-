const passport = require('passport');
const express = require('express');
const router = express.Router();
const mmController = require('../controllers/mm.controllers');

router.post('/login', mmController.login);

router.post('/addAccount', mmController.addAccount);

router.get('/showAccount', mmController.showAccount);

router.delete('/deleteAccount', mmController.deleteAccount);

router.post('/addAuditPlan', mmController.addAuditPlan);

router.delete('/deleteAuditPlan', mmController.deleteAuditPlan);

router.put('/UpdateAuditPlan', mmController.UpdateAuditPlan);

router.get('/showAuditPlan', mmController.showAuditPlan);

router.post('/addAPdetail', mmController.addAPdetail);

module.exports = router;