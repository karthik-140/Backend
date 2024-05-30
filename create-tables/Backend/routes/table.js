const express = require('express');

const tableControllers = require('../controllers/tableControllers');

const router = express.Router();

router.post('/create-table', tableControllers.createTable);

router.get('/table/:tableName', tableControllers.getTableData);

router.post('/add/:tableName', tableControllers.insertDataIntoTable);

router.delete('/delete/:id', tableControllers.deleteFromTable);

router.get('/tables', tableControllers.fetchTables);

router.get('/', (req, res, next) => {
    console.log('home');
})

module.exports = router;
