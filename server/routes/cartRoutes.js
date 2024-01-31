const { Router } = require('express');
const {
    createOrUpdateCart,
    getAllCart,
    clearAllCart,
    removeItemInCart,
} = require('../controller/cartController');

const router = Router();

router.route("/cart/create").post(createOrUpdateCart);
router.route("/cart").get(getAllCart);
router.route("/cart/delete").delete(clearAllCart);
router.route("/cart/remove").delete(removeItemInCart);

module.exports = router;
