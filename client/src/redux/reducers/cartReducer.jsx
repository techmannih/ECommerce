const cart = [];

const handleCart = (state = cart, action) => {
  const product = action.payload;

  switch (action.type) {
    case "ADDITEM":
      // Check if product already in cart
      const existingProduct = state.find((x) => x.id === product.id);

      if (existingProduct) {
        // Increase the quantity
        return state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        return state.concat({ ...product, qty: 1 });
      }

    case "DELITEM":
      const existingProduct2 = state.find((x) => x.id === product.id);

      if (existingProduct2.qty === 1) {
        return state.filter((x) => x.id !== existingProduct2.id);
      } else {
        return state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      case "DELITEMBYID":
        return state.filter((x) => x.id !== product.id);
    default:
      return state;
  }
};

export default handleCart;
