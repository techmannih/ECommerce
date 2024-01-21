// For Add Item to Cart
export const addToCart = (product) =>{
  return {
      type:"ADDITEM",
      payload:product
  }
}

// For Delete Item to Cart
export const removeFromCart = (product) =>{
  return {
      type:"DELITEM",
      payload:product
  }
}