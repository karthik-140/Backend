const User = require('../models/user');

exports.getUsers = (req, res, next) => {
  User.findAll()
    .then((response) => {
      res.status(200).json({ response: response })
      // console.log(response);
    }).catch((err) => {
      console.log(err)
    })
}

exports.addUsers = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  User.create({ name, email, phone })
    .then((response) => {
      res.status(201).json(response)
      // console.log(response)
    })
    .catch(err => console.log(err));
}

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  User.destroy({ where: { id: id } })
    .then((response) => {
      res.status(200).json(response)
      // console.log('deletedUserResponse', res);
    })
    .catch(err => console.log(err))
}
