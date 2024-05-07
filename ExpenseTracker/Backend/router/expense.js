const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expenseController');

router.get('/expenses', expenseController.getExpenses);

router.post('/add-expense', expenseController.addExpense);

router.delete('/delete-expense/:id', expenseController.deleteExpense);

// router.put('/edit-expense/:id', expenseController.editExpense);

module.exports = router;
