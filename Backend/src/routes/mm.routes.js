const passport = require('passport');
const express = require('express');
const router = express.Router();
const mmController = require('../controllers/mm.controllers');

router.post('/login', mmController.login);

router.post('/addAccount', mmController.addAccount);

router.get('/showAccount', mmController.showAccount);

router.delete('/deleteAccount', mmController.deleteAccount);

module.exports = router;