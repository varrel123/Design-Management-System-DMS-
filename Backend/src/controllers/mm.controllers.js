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



module.exports = {
    login,
    addAccount,
    showAccount,
    deleteAccount
}