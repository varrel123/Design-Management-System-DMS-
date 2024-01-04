const res = require('express/lib/response');
const { use } = require('passport/lib');
const db = require('../configs/db.config');
const helper = require('../utils/helper');

async function login (mm){
    const {accountid, password} = mm;
    const query = `SELECT * FROM account WHERE accountid = '${accountid}'`;
    const result = await db.query(query);
    if(result.rows.length === 0){
        return {
            message: 'User not found'
        }
    }else{
        const user = result.rows[0];
        if(user.password === password){
            return {
                message: 'Login successful',
                user
            }
        }else{
            return {
                message: 'Password is not correct'
            }
        }
    }
}

async function addAccount (mm){
    const {accountid, password} = mm;
    const pass = await helper.hashPassword(password);
    const query = `INSERT INTO account (username, password) VALUES ('${accountid}', '${pass}')`;
    const result = await db.query(query);
    if(result.rowCount === 1){
        return {
            message: 'User Created'
        }
    }else{
        return{
            message: 'Error'
        } 
    }
}

async function showAccount (account){
    if(account){
        const query = `SELECT * FROM account WHERE "accountid" = '${account.accountid}'`;
        const result = await db.query(query);
        if(result.rowCount === 1){
            return {
                message: 'Account found',
                user : result.rows
            }
        }else{
            return {
                message: 'Account not found'
            }
        }
    }else{
        return {
            message: 'Account not found'
        }
    }
}

async function deleteAccount (account){
    if(account){
        const query = `DELETE FROM account WHERE "accoundid" = ${account.accountid}`;
        const result = await db.query(query);
        if(result.rowCount === 1){
            return {
                message: 'User deleted'
            }
        }
        else{
            return {
                message: 'User not found'
            }
        }
    }
    else{
        return {
            message: 'USer not logged in'
        }
    }
}



module.exports = {
    login,
    addAccount,
    showAccount,
    deleteAccount
}