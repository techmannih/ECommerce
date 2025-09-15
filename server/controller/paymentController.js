const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

module.exports.makePayment = async (req, res) => {
  try {
    const { totalItems, subtotal, shipping } = req.body;

    // Determine the client URL either from env or request header
    const clientUrl =
      process.env.CLIENT_URL || req.headers.origin || "http://localhost:5173";

    // Convert values to numbers to avoid string concatenation issues
    const subtotalNum = Number(subtotal);
    const shippingNum = Number(shipping);

    // Validate the presence of required order details allowing zero values
    if (
      totalItems === undefined ||
      subtotal === undefined ||
      shipping === undefined ||
      Number.isNaN(subtotalNum) ||
      Number.isNaN(shippingNum)
    ) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or missing order details in the request",
      });
    }

    const amount = Math.round((subtotalNum + shippingNum) * 100); // in cents

    if (amount <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Total amount must be greater than zero",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Order Summary",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${clientUrl}/orders`,
      cancel_url: `${clientUrl}/orders`,
    });

    res.json({
      status: "success",
      message: "Payment initiated successfully",
      url: session.url,
    });
  } catch (error) {
    console.error("Error making payment:", error);

    if (error.type === "StripeCardError") {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }

    if (error.type === "StripeInvalidRequestError") {
      return res.status(400).json({
        status: "error",
        message: "Invalid request to Stripe API",
      });
    }

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
