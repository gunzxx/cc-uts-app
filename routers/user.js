const express = require('express');
const { queryDB } = require('../utils/db');
const router = express.Router();
const { validationResult, body } = require('express-validator');
const multer = require('multer');
const upload = multer();
const moment = require('moment'); 


router.route('/note/:id')
    .get(async (req, res) => {
        try {
            const result = await queryDB(`SELECT * FROM notes where id = ${req.params.id} limit 1`);

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
    .put(body('notes').notEmpty(), upload.array(), async (req, res) => {
        const id = req.params.id;

        const resultValidation = validationResult(req);
        if (resultValidation.isEmpty()) {
            try {
                const queryString = `UPDATE notes set notes = '${req.body.notes}' WHERE id =${id}`;
                const resultDB = await queryDB(queryString);
                const note = (await queryDB(`SELECT * FROM notes where id = ${id} limit 1`))[0];
                console.log(note);

                return res.json({ message: 'note has been updated' });
            } catch (error) {
                return res.status(500).json(error);
            }
        }

        res.status(400).json({
            message: 'data is not valid',
        })
    })
    .delete(async (req, res) => {
        const id = req.params.id;
        try {
            const note = await queryDB(`SELECT * FROM notes where id = ${id} limit 1`);

            if (note.length == 1) {
                await queryDB(`DELETE FROM notes where id = ${id}`);

                return res.json({ message: 'note has deleted' });
            }

            return res.status(404).json({
                message: 'note not found',
            })
        } catch (error) {
            res.status(500).json(error);
        }
    })
    .all((req, res, next) => res.status(405).json({ message: "method not allowed" }))

router.route('/note')
    .get(async (req, res) => {
        try {
            const result = await queryDB('SELECT * FROM notes');

            res.json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    })
    .post(body('notes').notEmpty(), upload.array(), async (req, res) => {
        const result = validationResult(req);
        const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

        if (result.isEmpty()) {
            try {
                const queryString = `INSERT INTO notes (notes, creator, created_at) VALUES ('${req.body.notes}', '${req.body.creator || ''}', '${createdAt}')`;
                const resultDB = await queryDB(queryString);
                const note = (await queryDB(`SELECT * FROM notes where id = ${resultDB.insertId} limit 1`))[0];
                console.log(note);

                return res.json({ message: 'note has been add' });
            } catch (error) {
                return res.status(500).json(error);
            }
        }

        res.status(400).json({
            message: 'data is not valid',
        })

    })

module.exports = router;