
const express = require('express');
let items = require('./fakeDb');
const router = new express.Router();

router.get('/', (req, res) => {
    res.json(items);
})

router.post('/', (req, res) => {
    items.push(req.body);
    res.json({added: req.body});
})

router.get('/:name', (req, res) => {
    res.json(items.find(item => item.name === req.params.name) || {});
})

router.patch('/:name', (req, res) => {
    const itemName = req.body.name;

    try {
        items.splice(items.findIndex(item => item.name === itemName), 1)
        items.push(req.body);
        res.json({updated: req.body});
    } catch(e) {
        res.json({});
    }
})

router.delete('/:name', (req, res) => {
    try {
        items.splice(items.findIndex(item => item.name === req.params.name), 1)
        res.json({message: "Deleted"});
    } catch(e) {
        res.json({});
    }
})

module.exports = router;