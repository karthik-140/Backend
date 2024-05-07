const User = require('../models/user');

exports.addUsers = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    try {
        const data = await User.create({ name: name, email: email });
        res.status(201).json({ userData: data });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.getUsers = (req, res, next) => {
    User.findAll()
        .then((response) => {
            res.status(200).json({ userData: response });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        await User.destroy({ where: { id: userId } })
        res.sendStatus(200)
    } catch (err) {
        console.log(err);
        res.status(400).json({ err: err })
    }
}
