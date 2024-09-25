const express = require('express');
/* Controllers */
const authToken = require('../middleware/authToken');
const usersSignUpController = require('../controller/User/userSignUp');
const usersSignInController = require('../controller/User/userSignIn');
const userDetailController = require('../controller/User/userDetails');
const userLogout = require('../controller/User/userLogout');
const allUsers = require('../controller/User/allUsers');
const updateUser = require('../controller/User/updateUser');
const uploadProductController = require('../controller/Product/uploadProduct');
const getProductsController = require('../controller/Product/getProducts');
const updateProductDetailsController = require('../controller/Product/updateProductDetails');
const getSingleCategoryProduct = require('../controller/Product/getSingleCategoryProduct');
const getCategoryWiseProduct = require('../controller/Product/getCategoryWiseProduct');
const getProductDetails = require('../controller/Product/getProductDetails');
const addToCartController = require('../controller/User/addToCartController');
const countCartItems = require('../controller/User/countCartItems');
const userCartView = require('../controller/User/userCartView');
const updateCartProduct = require('../controller/User/updateCartProduct');
const deleteCartItem = require('../controller/User/deleteCartItem');
const searchProduct = require('../controller/Product/searchProduct');
const filterProductController = require('../controller/Product/filterProduct');
const paymentController = require('../controller/Order/paymentController');
const webhook = require('../controller/Order/webhook');
const orderController = require('../controller/Order/orderController');
/* Express Router */
const router = express.Router();

/* -------User------- */
router.post("/signup", usersSignUpController)
router.post("/signin", usersSignInController)
router.get("/user-detail", authToken, userDetailController)
router.get("/userLogout", userLogout)

/* ----------Admin Panel Routes---------- */
router.get("/all-users", authToken, allUsers)
router.post("/update-user", authToken, updateUser)

/* ------Product------ */
router.post("/upload-product", authToken, uploadProductController)
router.get("/get-products", getProductsController)
router.post("/update-product", authToken, updateProductDetailsController)
router.get("/get-category-product", getSingleCategoryProduct)
router.post("/category-products", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)
router.post("/filter-products", filterProductController)

// user add to cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countcartitems", authToken, countCartItems)
router.get("/user-cart-view", authToken, userCartView)
//Update/delete cart
router.post("/update-cart-product", authToken, updateCartProduct)
router.post("/delete-cart-product", authToken, deleteCartItem)

//Payment and order
router.post("/checkout", authToken, paymentController)
router.post("/webhook", webhook) /* api/webhook */
router.get("/order-list",authToken,orderController)

module.exports = router
