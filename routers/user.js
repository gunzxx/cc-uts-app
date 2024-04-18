const express = require('express');
const { query } = require('../utils/db');
const router = express.Router();

router.route('/note/:id')
    .get(async (req, res) => {
        try {
            const result = await query(`SELECT * FROM notes where id = ${req.params.id} limit 1`);

            if (result.length < 1) {
                return res.status(404).json({
                    message: 'note not found',
                })
            }
            return res.json(result[0]);
        } catch (error) {
            res.status(500).json(error);
        }
    })
    .put((req, res) => {
        res.json({
            method: 'put',
        });
    })
    .delete(async (req, res) => {
        try {
            const note = await query(`SELECT * FROM notes where id = ${req.params.id} limit 1`);

            if (note.length < 1) {
                return res.status(404).json({
                    message: 'note not found',
                })
            }

            await query(`DELETE notes where id = ${req.params.id}`);

            return res.json({ message: 'note has delete' });
        } catch (error) {
            res.status(500).json(error);
        }
    })
// .all('/note/:id',methods)

router.route('/note')
    .get(async (req, res) => {
        try {
            const result = await query('SELECT * FROM notes');

            res.json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    })
    .post((req, res) => {
        res.json(req.body);
        console.log(req.query);
    })

module.exports = router;