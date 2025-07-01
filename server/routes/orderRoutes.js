const { Router } = require("express");
const {
  createOrder,
  cancelOrder,
  getOrderByUserId,
  getOrderById,
  removeOrder,
  updatePaymentStatus
} = require("../controller/orderController");
const router = Router();

router.route("/order/create").post(createOrder);
router.route("/order/all/:userId").get(getOrderByUserId);
router.route("/order/:id").get(getOrderById);
router.route("/order/cancel/:id").put(cancelOrder);
router.route("/order/remove/:orderId").delete(removeOrder)
router.route("/order/updatePaymentStatus").put(updatePaymentStatus)
module.exports = router;
