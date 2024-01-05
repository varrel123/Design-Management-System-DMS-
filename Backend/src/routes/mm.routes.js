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

router.get('/showAuditPlanACC', mmController.showAuditPlanACC);

router.post('/addAPdetail', mmController.addAPdetail);

router.get('/showAPdetail', mmController.showAPdetail);

router.put('/UpdateAPdetail', mmController.UpdateAPdetail);

router.post('/addIssuence', mmController.addIssuence);

router.post('/addOccurrence', mmController.addOccurrence);

router.get('/showOccurrence', mmController.showOccurrence);

router.get('/showissuence', mmController.showissuence);

router.put('/updateOccurrence', mmController.updateOccurrence);

router.delete('/deleteOccurrence', mmController.deleteOccurrence);

router.post('/addCategoryIOR', mmController.addCategoryIOR);

router.post('/addFollowUpOccurrence', mmController.addFollowUpOccurrence);

module.exports = router;