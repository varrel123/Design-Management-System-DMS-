const mmService = require('../services/mm.services');


async function login(req,res){
    try{
        res.json({message: 'success'});
    }catch(err){
        res.json(err);
    }
}

async function addAccount(req,res){
    try{
        const result = await mmService.addAccount(req.body);
        res.json(result);
    }catch(err){
        res.json(err.detail);
    }
}

async function showAccount(req,res){
    try{
        const result = await mmService.showAccount(req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function deleteAccount(req,res){
    try{
        const result = await mmService.deleteAccount(req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function addAuditPlan(req,res){
    try{
        const result = await mmService.addAuditPlan(req.body);
        res.json(result);
    }catch(err){
        res.json(err.detail);
    }
}

async function deleteAuditPlan(req,res){
    try{
        const result = await mmService.deleteAuditPlan(req.body);
        res.json(result);
    }catch(err){
        res.json(err.detail);
    }
}

async function UpdateAuditPlan(req,res){
    try{
        const result = await mmService.UpdateAuditPlan(req.body);
        res.json(result);
    }catch(err){
        res.json(err.detail);
    }
}

async function showAuditPlan(req,res){
    try{
        const result = await mmService.showAuditPlan(req.body);
        res.json(result);
    }catch(err){
        res.json(err.detail);
    }
}

async function addAPdetail(req,res){
    try{
        const result = await mmService.addAPdetail(req.body);
        res.json(result);
    }catch(err){
        res.json(err.detail);
    }
}
module.exports = {
    login,
    addAccount,
    showAccount,
    deleteAccount,
    addAuditPlan,
    deleteAuditPlan,
    UpdateAuditPlan,
    showAuditPlan,
    addAPdetail
}