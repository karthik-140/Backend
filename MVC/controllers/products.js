const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  })
}

exports.postAddProducts = (req, res, next) => {
  const product = new Product(req.body.title)
  product.save()
  // product.push({ title: req.body.title })
  res.redirect('/')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    })
  })
}

exports.errorPage = (req, res, next) => {
  res.send('pageNotFound', {
    pageTitle: 'Page not found'
  })
}
