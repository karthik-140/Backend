const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(result => {
    // console.log(result);
    res.redirect('/');
  })
  .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId
  Product.findByPk(prodId)
  .then((product) => {
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  // Product.findByPk(productId)
  // .then(product => {
  //   product.title = updatedTitle;
  //   product.price = updatedPrice;
  //   product.imageUrl = updatedImageUrl;
  //   product.description = updatedDesc;
  //   return product.save();
  // })
  // .then(() => {
  //   res.redirect('/admin/products');
  // })
  // .catch(err => {
  //   console.log(err);
  // }) 
  Product.update(
    { title: updatedTitle, price: updatedPrice, imageUrl: updatedImageUrl, description: updatedDesc },
    { where: {
        id: productId
      }
    }
  )
  .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => {
    console.log(err);
  });
};


exports.getDeleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.destroy({
    where: {
      id: productId
    }
  })
  .then((product) => {
    res.redirect('/');
  })
  .catch(err => {
    console.log(err);
  })
}