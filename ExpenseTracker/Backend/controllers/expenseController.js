const Expenses = require('../models/expense');

exports.addExpense = async (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    // const id = req.params.id;
    // console.log('addExpense', id)
    // if(id) {
    //     try {
    //         const response = await Expenses.update(
    //          {amount: amount, description: description, category: category},
    //          {where: { id: id }}
    //         )
    //         res.status(301).json({response: response});
    //     } catch(err) {
    //         res.status(400).json({err: err});
    //         console.log(err)
    //     }
    // } else {
        try {
            const response = await Expenses.create({ amount: amount, description: description, category: category });
            res.status(201).json({ expenses: response });
        } catch (err) {
            console.log(err);
            res.status(500).json({ err: err });
        }
    // }
}

exports.getExpenses = async (req, res, next) => {
    try {
        const response = await Expenses.findAll();
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(400).json({ err: err });
    }
}

exports.deleteExpense = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(!id) {
            return res.status(400).json({err: 'ID is missing'})
        }
        await Expenses.destroy({ where: { id: id } });
        res.status(200).json({response: "Successfully Deleted"});
    } catch (err) {
        console.log(err);
        res.status(400).json({err: err});
    }
}

// exports.editExpense = async (req, res, next) => {
//     const amount = req.body.amount;
//     const description = req.body.description;
//     const category = req.body.category;
//     const id = req.params.id;
//     console.log('addExpense', id)
//     try {
//         if(!id) {
//             res.status(400).json({err: "ID is missing"});
//         }
//         const response = await Expenses.update(
//             {amount: amount, description: description, category: category},
//             {where: { id: id }}
//         );
//         res.status(301).json({response: response});
//     } catch(err) {
//         res.status(400).json({err: err});
//         console.log(err)
//     }
// }