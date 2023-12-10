const { Router } = require('express')
const {
    getAllOrder,
    cancelOrder,
    createOrder,
  } = require('../controller/orderController');
const router = Router()

router.route('/order/create').post(createOrder);
router.route("/order").get(getAllOrder)
router.route('/order/:orderId/cencel').put(cancelOrder);
module.exports = router