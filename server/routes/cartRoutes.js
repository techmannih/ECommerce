const { Router } = require('express')
const {
    createCart,
    getAllCart,
    clearCart,
    removeItemInCart,
  } = require('../controller/cartController');
  
const router = Router()

router.route("/cart/create").post(createCart)
router.route("/cart").get(getAllCart)
router.route("/cart/remove").delete(clearCart)
router.route("/cart/items/remove").put(removeItemInCart)

module.exports = router