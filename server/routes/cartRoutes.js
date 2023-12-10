const { Router } = require('express')
const {
    createCart,
    getAllCart,
    clearAllCart,
    removeItemInCart,
  } = require('../controller/cartController');
  
const router = Router()

router.route("/cart/create").post(createCart)
router.route("/cart").get(getAllCart)
router.route("/cart/delete").get(clearAllCart)
router.route("/cart/remove").put(removeItemInCart)

module.exports = router