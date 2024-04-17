const express = require('express');
const { query } = require('../utils/db');
const router = express.Router();

router.route('/user')
    .get(async (req, res) => {
        try {
            const result = await query('SELECT * FROM user');
    
            res.json(result);
            console.log(result);            
        } catch (error) {
            res.json(error);
        }
    })
    .put((req, res) => {
        res.json({
            method: 'put',
        });
    })
    .delete((req, res) => {
        res.json({
            method: 'delete',
        });
    })

router.get('/user/:id', async (req, res) => {
    try {
        const result = await query(`SELECT * FROM user where id = ${req.params.id} limit 1`);
        
        if(result.length < 1){
            return res.status(404).json({
                message: 'user not found',
            })
        }
        console.log(result);
        return res.json(result[0]);        
    } catch (error) {
        res.json(error);
    }
})

module.exports = router;