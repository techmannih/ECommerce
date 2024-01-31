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
router.route("/cart/delete").delete(clearAllCart)
router.route("/cart/remove").delete(removeItemInCart)

module.exports = router